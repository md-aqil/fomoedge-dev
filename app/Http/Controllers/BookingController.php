<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookingRequest;
use App\Repositories\BookingRepository;
use App\Repositories\CourseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(protected BookingRepository $bookingRepository, protected CourseRepository $courseRepository) {}

    public function create($courseSlug)
    {
        $course = $this->courseRepository->firstOrFailWhere('slug', $courseSlug);

        return Inertia::render('Bookings/Booking', ['course' => $course, 'calculateCoursePrices' => calculateCoursePrices($course)]);
    }

    public function store(CreateBookingRequest $createBookingRequest, $courseSlug)
    {
        $this->courseRepository->firstOrFailWhere('slug', $courseSlug);

        $booking = $this->bookingRepository->createBooking($createBookingRequest, $courseSlug);

        return response()->json(['booking' => $booking]);
    }

    public function callback(Request $request, $bookingId)
    {
        try {
            $bookingId = decrypt($bookingId);
        } catch (\Exception $e) {
            abort(404);
        }

        $booking = $this->bookingRepository->findOrFail($bookingId);

        if (isset($request->razorpay_payment_link_status) && $request->razorpay_payment_link_status == 'paid') {
            $transaction = $this->bookingRepository->callback($request, $bookingId);
            return redirect()->route('booking.success', encrypt($bookingId))->with(['flash_type' => 'success', 'flash_message' => 'Payment successful']);
        } else {
            return redirect()->route('booking.store', $booking->course->slug)->with(['flash_type' => 'failed', 'flash_message' => 'Payment failed']);
        }
    }

    public function success($decryptedBookingId)
    {
        try {
            $bookingId = decrypt($decryptedBookingId);
        } catch (\Exception $e) {
            abort(404);
        }

        $booking = $this->bookingRepository->model->with('transaction')->findOrFail($bookingId);

        return  Inertia::render('Bookings/Success', ['booking' => $booking]);
    }
}
