<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMentorKycDetailRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string',
            'email' => 'required|string|email',
            'phone_number' => 'required|string|min:10|max:15',
            'pan_number' => 'required|string|max:10',
            'gst' => 'nullable|string|max:15',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'pin_code' => 'required|string|min:5|max:6',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'bank_ifsc_code' => 'required|string',
            'bank_account_holder_name' => 'required|string',
        ];
    }
}
