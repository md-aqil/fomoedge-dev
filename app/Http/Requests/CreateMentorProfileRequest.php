<?php

namespace App\Http\Requests;

use App\Enums\MentorProfileStatusEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class CreateMentorProfileRequest extends FormRequest
{
    // public function after(): array
    // {
    //     return [
    //         function (Validator $validator) {
    //             $findUser = User::with('mentorProfile')->where('id', $this->user_id)->first();
    //             if ($findUser && $findUser->mentorProfile) {
    //                 if (($findUser->mentorProfile->topics && $findUser->mentorProfile->topics()->count() == 0) || ($this->filled('topic_ids') && count($this->topic_ids) == 0)) {
    //                     $validator->errors()->add(
    //                         'topic_ids',
    //                         'Please add at least one topic.'
    //                     );
    //                 }

    //                 if (($findUser->mentorProfile->topicTags && $findUser->mentorProfile->topicTags()->count() == 0) || ($this->filled('topic_tag_ids') && count($this->topic_tag_ids) == 0)) {
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
        return [
            'first_name' => 'sometimes|required|string',
            'last_name' => 'nullable|string',
            'user_id' => 'required|integer|exists:users,id',
            'show_email' => 'nullable|boolean',
            'alias_name' => 'sometimes|string|unique:mentor_profiles,alias_name',
            'show_alias' => 'nullable|boolean',
            'phone_country_id' => 'required|integer|exists:countries,id',
            'phone' => 'required|string|min:10|max:15',
            'show_phone' => 'nullable|boolean',
            'why_choose_us' => 'nullable|string',
            'experience' => 'required|string',
            'short_description' => 'nullable|string',
            'company_name' => 'nullable|string',
            'bio' => 'nullable|string',
            'languages' => 'nullable|array',
            'languages.*' => 'sometimes|string',
            'educations' => 'nullable|array',
            'educations.*.school' => 'required|string',
            'educations.*.degree' => 'required|string',
            'educations.*.status' => 'required|boolean',
            'social_links' => 'nullable|array',
            'social_links.*.label' => 'required|string',
            'social_links.*.url' => 'required|url',
            'social_links.*.status' => 'required|boolean',
            'topic_ids' => 'nullable|array',
            'topic_ids.*' => 'required|integer|exists:topics,id',
            'topic_tag_ids' => 'nullable|array',
            'topic_tag_ids.*' => 'required|integer|exists:topic_tags,id',
            'profile_picture' => 'nullable|image|max:2048',
            'status' => ['sometimes', 'required', 'string', Rule::in(MentorProfileStatusEnum::cases())],
            'activated_at' => 'nullable|boolean',
        ];
    }
}
