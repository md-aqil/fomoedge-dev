<?php

namespace App\Http\Requests;

use App\Enums\CourseTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'mentor_profile_id' => 'sometimes|required|exists:mentor_profiles,id',
            'type' => ['nullable', 'string', Rule::in(CourseTypeEnum::cases())],
            'title' => 'nullable|string|max:255',
            'slug' => 'nullable|string|unique:courses,slug,' . $this->route('id'),
            'excerpt' => 'nullable|string',
            'description' => 'nullable|string',
            'value' => 'nullable',
            'is_free' => 'nullable|boolean',
            'activated_at' => 'sometimes|nullable|boolean',
            'featured_image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'bundle_types' => 'nullable|array',
            'bundle_types.*.course_id' => 'required|integer|exists:courses,id',
            'bundle_types.*.quantity' => 'required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:500',
            'special_price' => 'nullable|numeric|min:500',
            'special_price_start_at' => 'nullable|date_format:Y-m-d H:i:s',
            'special_price_end_at' => 'nullable|date_format:Y-m-d H:i:s',
            'topic_ids' => 'sometimes|required|array|min:1|max:3',
            'topic_ids.*' => 'required|integer|exists:topics,id',
            'topic_tag_ids' => 'sometimes|required|array|min:1|max:3',
            'topic_tag_ids.*' => 'required|integer|exists:topic_tags,id',
            'timings' => 'nullable|array',
            'timings.*.id' => 'sometimes|required|integer|exists:course_timings,id',
            'timings.*.start_date' => 'required|date_format:Y-m-d',
            'timings.*.start_time' => 'required|date_format:H:i:s',
            'timings.*.end_date' => 'nullable|date_format:Y-m-d',
            'timings.*.end_time' => 'nullable|date_format:H:i:s',
            'activated_at' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'price.min' => 'The price must be at least 500.',
            'special_price.min' => 'The special price must be at least 500.',
            'timings.*.start_date.required' => 'Start date is required.',
            'timings.*.start_time.required' => 'Start time is required.',
        ];
    }
}
