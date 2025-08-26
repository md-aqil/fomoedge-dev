<?php

use App\Models\Course;
use App\Models\PlatformFee;
use App\Models\Tax;
use Illuminate\Support\Facades\Auth;

function enumLabelArray($class)
{
    $data = [];
    foreach ($class as $case) {
        $data[] = ['value' => $case->value, 'label' => $case->label()];
    }
    return $data;
}

function enumToLabel($value, $class)
{
    return $class::from($value)->label();
}

function mentorProfile()
{
    return Auth::user()->load('mentorProfile');
}

function calculateCoursePrices($course)
{
    $course = Course::find($course->id);
    $mentorProfile = $course->mentorProfile;

    $price = $course->price->price;
    $special_price = $course->price->special_price;

    $taxAmount = 0;
    if ($mentorProfile->tax) {
        $tax = $mentorProfile->tax;
    } else {
        $tax = Tax::default()->active()->first();
    }

    if ($tax) {
        $taxAmount = $course->price->actualPrice * ($tax->value / 100);
    }

    $platformFeeAmount = 0;
    if ($mentorProfile->platformFee) {
        $platformFee = $mentorProfile->platformFee;
    } else {
        $platformFee = PlatformFee::default()->active()->first();
    }

    if ($platformFee) {
        if ($platformFee->type == 'percentage' || $platformFee->type == 'PERCENTAGE') {
            $platformFeeAmount = $course->price->actualPrice * ($platformFee->value / 100);
        }

        if ($platformFee->type == 'fixed' || $platformFee->type == 'FIXED') {
            $platformFeeAmount = $platformFee->value;
        }
    }

    $grandTotalAmount = $course->price->actualPrice + $taxAmount + $platformFeeAmount;

    return [
        'price' => $price,
        'is_special_active' => $course->price->isSpecialPriceValid,
        'special_price' => $special_price,
        'actual_price' => $course->price->actualPrice,
        'tax_amount' => $taxAmount,
        'platform_fee_amount' => $platformFeeAmount,
        'grand_total_amount' => $grandTotalAmount,
    ];
}
