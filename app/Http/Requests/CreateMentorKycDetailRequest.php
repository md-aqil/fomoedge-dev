<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMentorKycDetailRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'mentor_id' => 'required|integer|exists:mentors,id',
            'full_name' => 'required|string',
            'email' => 'required|string|email',
            'phone_number' => 'required|string|min:10|max:15',
            'pan_number' => 'required|string|max:10',
            'gst' => 'nullable|string|max:15',
            'address' => 'required|string|min:10',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'country_id' => 'required|integer|exists:countries,id',
            'pin_code' => 'required|string|min:5|max:6',
            'bank_name' => 'required|string',
            'bank_account_number' => 'required|string',
            'bank_ifsc_code' => 'required|string',
            'bank_account_holder_name' => 'required|string',
            'pan_card_attachment' => 'required|file|mimes:jpeg,jpg,png,pdf|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'country_id.required' => 'Phone Country is required.',
        ];
    }
}
