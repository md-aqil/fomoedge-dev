<?php

namespace App\Http\Requests;

use App\Enums\MentorProfileStatusEnum;
use App\Models\MentorProfile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateMentorProfileRequest extends FormRequest
{
    // public function after(): array
    // {
    //     $mentorProfileId = Auth::check() && Auth::user()->hasRole('mentor') ? Auth::user()->mentorProfile->id : $this->route('id');
    //     return [
    //         function (Validator $validator) use ($mentorProfileId) {
    //             $mentorProfile = MentorProfile::with('topics', 'topicTags')->where('id', $mentorProfileId)->first();
    //             if ($mentorProfile) {
    //                 if (($mentorProfile->topics && $mentorProfile->topics()->count() == 0) || ($this->filled('topic_ids') && count($this->topic_ids) == 0)) {
    //                     $validator->errors()->add(
    //                         'topic_ids',
    //                         'Please add at least one topic.'
    //                     );
    //                 }

    //                 if (($mentorProfile->topicTags && $mentorProfile->topicTags()->count() == 0) || ($this->filled('topic_tag_ids') && count($this->topic_tag_ids) == 0)) {
    //                     $validator->errors()->add(
    //                         'topic_tag_ids',
    //                         'Please add at least one topic tag.'
    //                     );
    //                 }
    //             }
    //         }
    //     ];
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = Auth::check() && Auth::user()->hasRole('mentor') ? Auth::user()->mentorProfile->id : $this->route('id');
        return [
            'first_name' => 'sometimes|required|string',
            'last_name' => 'nullable|string',
            'show_email' => 'nullable|boolean',
            'alias_name' => 'sometimes|string|unique:mentor_profiles,alias_name,' . $id,
            'show_alias' => 'nullable|boolean',
            'phone_country_id' => 'nullable|integer|exists:countries,id',
            'phone' => 'nullable|string|min:10|max:15',
            'show_phone' => 'nullable|boolean',
            'why_choose_us' => 'nullable|string',
            'experience' => 'nullable|string',
            'short_description' => 'nullable|string',
            'company_name' => 'nullable|string',
            'bio' => 'nullable|string',
            'languages' => 'nullable|array',
            'languages.*' => 'sometimes|string',
            'educations' => 'nullable|array',
            'educations.*.school' => 'sometimes|string',
            'educations.*.degree' => 'sometimes|string',
            'educations.*.status' => 'sometimes|boolean',
            'social_links' => 'nullable|array',
            'social_links.*.label' => 'sometimes|required|string',
            'social_links.*.url' => 'sometimes|required|url',
            'social_links.*.status' => 'sometimes|required|boolean',
            'topic_ids' => 'required|array|min:1|max:3',
            'topic_ids.*' => 'sometimes|integer|exists:topics,id',
            'topic_tag_ids' => 'required|array|min:1|max:3',
            'topic_tag_ids.*' => 'sometimes|integer|exists:topic_tags,id',
            'tax_id' => 'nullable|integer|exists:taxes,id',
            'platform_fee_id' => 'nullable|integer|exists:platform_fees,id',
            'profile_picture' => 'nullable|image|max:2048',
            'status' => ['sometimes', 'required', 'string', Rule::in(MentorProfileStatusEnum::cases())],
            'activated_at' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'social_links.*.label.required' => 'The label is required.',
            'social_links.*.url.required' => 'The URL is required.',
            'social_links.*.url.url' => 'The URL is invalid.',
            'social_links.*.status.required' => 'The status is required.',
        ];
    }
}
