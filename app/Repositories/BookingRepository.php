<?php

namespace App\Repositories;

use App\Enums\BookingStatusEnum;
use App\Models\Booking;
use App\Notifications\BookingSuccessNotification;
use App\Notifications\SendMentorMenteeMeetInviteNotification;
use App\Notifications\UserCreatedNotification;
use App\Services\GoogleClientServices;
use App\Services\RazorPayService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BookingRepository extends BaseRepository
{
    public $model;

    function __construct(Booking $model, protected UserRepository $userRepository, protected RazorPayService $razorPayService, protected TransactionRepository $transactionRepository, protected InvoiceRepository $invoiceRepository, protected RazorpayRepository $razorpayRepository)
    {
        $this->model = $model;
    }

    public function filter(Request $request, $with = [])
    {
        $model = $this->model;
        $user = Auth::user();

        if (!empty($with)) {
            $model = $model->with($with);
        }

        if ($request->has('mentor_profile_id') && $request->filled('mentor_profile_id')) {
            $model = $model->where('mentor_profile_id', $request->mentor_profile_id);
        } else {

            if ($user && $user->roles->contains('name', 'mentor') && str_contains($request->route()->getPrefix(), 'mentors')) {
                $model = $model->where('mentor_profile_id', $user->mentorProfile->id);
            }
        }

        if ($request->has('user_id') && $request->filled('user_id')) {
            $model = $model->where('user_id', $request->user_id);
        } else {
            if ($user && $user->roles->contains('name', 'user') && str_contains($request->route()->getPrefix(), 'user')) {
                $model = $model->where('user_id', $user->id);
            }
        }

        if ($request->has('status') && $request->filled('status')) {
            $model = $model->where('status', $request->status);
        } else {
            $model = $model->where('status', BookingStatusEnum::PAID->value);
        }

        return $model;
    }

    public function createBooking($request)
    {
        DB::beginTransaction();
        try {
            $user = $this->findOrCreateUser($request);

            $request->merge(['user_id' => $user->id]);

            $booking = $this->model->create($request->all());

            if ($booking) {
                $razorPayPaymentLinkResponse = $this->createPaymentLink($booking);
                if ($razorPayPaymentLinkResponse['status']) {
                    $booking->update([
                        'create_payment_gateway' => $razorPayPaymentLinkResponse['data']
                    ]);
                } else {
                    Log::error($razorPayPaymentLinkResponse['message']);
                }
            }

            DB::commit();
            return $booking;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            throw $e;
        }
    }

    public function findOrCreateUser($request)
    {
        $user = $this->userRepository->where('email', $request->email)->first();

        if ($user) {
            $request->merge(['user_id' => $user->id]);
        } else {
            $explodeFullName = explode(' ', $request->full_name);
            $userData = ['first_name' => $explodeFullName[0], 'last_name' => $explodeFullName[1] ?? '', 'email' => $request->email, 'password' => bcrypt(env('DEFAULT_USER_PASSWORD'))];
            $user = $this->userRepository->createUser($userData);

            $user->notify(new UserCreatedNotification());
        }

        return $user;
    }

    public function createPaymentLink($booking)
    {
        $paymentLinkData = [
            'amount' => $booking->grand_total_amount * 100,
            'currency' => 'INR',
            'accept_partial' => false,
            'description' => "Booking Payment for {$booking->course->title}",
            'customer' => [
                'name' => $booking->full_name,
                'email' => $booking->email,
                'contact' => $booking->phone_number,
            ],
            'notify' => ['sms' => true, 'email' => true],
            'callback_url' => route('booking.callback', ['bookingId' => encrypt($booking->id)]),
            'callback_method' => 'get',
        ];

        return $this->razorPayService->createPaymentLink($paymentLinkData);
    }

    public function callback($request, $bookingId)
    {
        $booking = $this->model->find($bookingId);

        $user = $this->userRepository->authByUserId($booking->user_id);

        $fetchPaymentWithId = $this->razorPayService->fetchPaymentWithId($request->razorpay_payment_id);

        $razorPayTransactionResponse = $request->all();

        if ($fetchPaymentWithId['status']) {
            $razorPayTransactionResponse = array_merge($fetchPaymentWithId['data'], $request->all());
        }

        try {
            $createGoogleClient = new GoogleClientServices();
            $googleMeetResponse = $createGoogleClient->createMeetingSpace();
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }

        $transactionData = [
            'booking_id' => $booking->id,
            'user_id' => $user->id,
            'course_id' => $booking->course_id,
            'total_amount' => $booking->grand_total_amount,
            'payment_gateway_transaction_data' => $razorPayTransactionResponse
        ];

        $transaction = $this->transactionRepository->create($transactionData);

        $invoiceRequest = new Request(['transaction_id' => $transaction->id, 'user_id' => $user->id, 'amount' => $booking->price, 'special_amount' => $booking->special_price, 'tax_amount' => $booking->tax_amount, 'platform_fee_amount' => $booking->platform_fee_amount, 'grand_total_amount' => $booking->grand_total_amount]);

        $invoice = $this->invoiceRepository->createWithPdf($invoiceRequest);

        $booking->update(['status' => BookingStatusEnum::PAID->value, 'is_paid' => 1, 'google_meet_response' => $googleMeetResponse ?? null]);

        $booking->user->notify(new BookingSuccessNotification($booking));

        if ($booking->google_meet_response) {
            $booking->user->notify(new SendMentorMenteeMeetInviteNotification($booking, 'mentee'));
            $booking->mentorProfile->user->notify(new SendMentorMenteeMeetInviteNotification($booking, 'mentor'));
        }

        $this->razorpayRepository->mentorSettlement($booking);

        return $transaction;
    }
}
