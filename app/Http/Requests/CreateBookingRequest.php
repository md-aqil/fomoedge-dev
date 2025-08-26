<?php

namespace App\Http\Requests;

use App\Enums\BookingStatusEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Validation\Rule;

class CreateBookingRequest extends FormRequest
{
    public function after(): array
    {
        return [
            function (Validator $validator) {
                $findUserByEmail = User::with('roles')->where('email', $this->email)->first();
                if ($findUserByEmail && ($findUserByEmail->hasRole('mentor') || $findUserByEmail->hasRole('admin'))) {
                    $validator->errors()->add(
                        'email',
                        'Please use a different email address. its already associated with another role.'
                    );
                }
            }
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'course_id' => 'required|integer|exists:courses,id',
            'mentor_profile_id' => 'required|integer|exists:mentor_profiles,id',
            'user_id' => 'sometimes|required|integer|exists:users,id',
            'full_name' => 'required|string',
            'email' => 'required|string|email',
            'phone_number' => 'required|string|min:10|max:15',
            'note' => 'nullable|string',
            'course_timing_id' => 'sometimes|required|integer|exists:course_timings,id',
            'course_value' => 'nullable|string',
            'price' => 'nullable|numeric',
            'special_price' => 'nullable|numeric',
            'tax_id' => 'nullable|integer|exists:taxes,id',
            'tax_amount' => 'nullable|numeric',
            'platform_fee_id' => 'nullable|integer|exists:platform_fees,id',
            'platform_fee_amount' => 'nullable|numeric',
            'grand_total_amount' => 'nullable|numeric',
            'is_gift' => 'nullable|boolean',
            'is_paid' => 'nullable|boolean',
            'status' => ['nullable', 'string', Rule::in(BookingStatusEnum::cases())],
        ];
    }
}
