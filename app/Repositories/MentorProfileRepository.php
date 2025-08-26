<?php

namespace App\Repositories;

use App\Enums\AttachmentTypeEnum;
use App\Models\MentorProfile;
use App\Notifications\MentorProfileVerifiedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MentorProfileRepository extends BaseRepository
{
	public $model;

	function __construct(MentorProfile $model, protected UserRepository $userRepository)
	{
		$this->model = $model;
	}

	public function filter($request, $with = [])
	{
		$query = $this->model->query();

		if (!empty($with)) {
			$query->with($with);
		}

		if ($request->has('search') && $request->filled('search')) {
			$query->whereLike(['user.first_name', 'user.last_name', 'user.email', 'phone'], $request->search);
		}

		return $query;
	}

	public function saveAndUpdate($request, $id = null)
	{
		$mentorProfile = $this->model->findOrNew($id);
		$prevProfileVerified = $mentorProfile->activated_at ? true : false;
		$profileVerified = false;
		$mentorProfileRequest = new Request($request->except(['profile_picture', 'topic_ids', 'topic_tag_ids', 'first_name', 'last_name']));

		if ($request->activated_at === true || $request->activated_at === 'true' || $request->activated_at === '1' || $request->activated_at === 1) {
			$mentorProfileRequest->merge(['activated_at' => now()]);
			$profileVerified = true;
		} else {
			if ($request->activated_at == 'false' || $request->activated_at === false || $request->activated_at === 0 || $request->activated_at === '0') {
				$mentorProfileRequest->merge(['activated_at' => null]);
			}
		}


		$mentorProfile->fill($mentorProfileRequest->all());
		$mentorProfile->save();

		if ($request->hasFile('profile_picture')) {
			$featuredImageRequest = new Request(['type' => AttachmentTypeEnum::PROFILE_PICTURE->value]);
			$this->uploadAttachment($mentorProfile, $request->profile_picture, $featuredImageRequest);
		}

		if (!empty($request->topic_ids)) {
			$mentorProfile->topics()->sync($request->topic_ids);
		}

		if (!empty($request->topic_tag_ids)) {
			$mentorProfile->topicTags()->sync($request->topic_tag_ids);
		}

		if ($request->has('first_name') || $request->has('last_name')) {
			$this->userRepository->update($mentorProfile->user_id, $request->only(['first_name', 'last_name']));
		}

		if ($prevProfileVerified != $profileVerified && $profileVerified) {

			$mentorProfile->user->notify(new MentorProfileVerifiedNotification());
		}

		return $mentorProfile;
	}

	public function updateActivatedAt($mentorProfile, $request)
	{
		if ($request->activated_at === true || $request->activated_at === 'true' || $request->activated_at === '1' || $request->activated_at === 1) {
			$mentorProfile->update(['activated_at' => now()]);
			$mentorProfile->user->notify(new MentorProfileVerifiedNotification());
		} else {
			if ($request->activated_at == 'false' || $request->activated_at === false || $request->activated_at === 0 || $request->activated_at === '0') {
				$mentorProfile->update(['activated_at' => null]);
			}
		}

		return $mentorProfile;
	}
}
