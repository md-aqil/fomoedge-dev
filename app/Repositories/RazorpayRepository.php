<?php

namespace App\Repositories;

use App\Services\RazorPayService;
use Illuminate\Support\Facades\Log;

class RazorpayRepository
{
    public function mentorSettlement($booking)
    {
        $razorPayService = new RazorPayService;
        $transaction = $booking->transaction;
        $mentorProfile = $booking->mentorProfile->load('kycDetail');

        if ($mentorProfile && $mentorProfile->kycDetail && $transaction->payment_gateway_transaction_data) {
            $transferRequest = [
                "transfers" => [
                    [
                        "account" => $mentorProfile->kycDetail->razor_pay_account->id,
                        "amount" => (($booking->special_price == 0 ? $booking->price : $booking->special_price) * (80 / 100)) * 100,
                        "currency" => "INR",
                        "notes" => [
                            "booking_info" => "Mentor settlement for booking " . $booking->id,
                            //"roll_no" => "IEC2011026"
                        ],
                        "linked_account_notes" => [
                            //"roll_no"
                        ],
                        "on_hold" => false
                        //"on_hold" => true,
                        //"on_hold_until" => strtotime(now()->addDays(3))
                    ]
                ]
            ];

            $response = $razorPayService->transferMoney($transaction->payment_gateway_transaction_data->id, $transferRequest);

            if ($response['status'] && $response['status_code'] == 200) {
                $transaction->update(['mentor_payment_settlement_at' => now(), 'razor_pay_mentor_settlement' => $response]);
                return true;
            } else {
                Log::error('Razorpay transfer money failed', ['response' => $response]);
                return false;
            }
        }

        return false;
    }
}
