<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRatingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|in:mentor_profiles,courses',
            'model_id' => 'required|integer|exists:' . $this->type . ',id',
            'user_id' => 'required|integer|exists:users,id',
            'booking_id' => 'required|integer|exists:bookings,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'value' => 'required|integer|min:1|max:5',
            'approved_by_user_id' => 'sometimes|required|integer|exists:users,id',
        ];
    }
}
