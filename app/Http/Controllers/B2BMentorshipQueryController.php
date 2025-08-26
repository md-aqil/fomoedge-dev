<?php

namespace App\Http\Controllers;

use App\Http\Resources\MentorProfileResource;
use App\Models\B2BMentorshipQuery;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class B2BMentorshipQueryController extends Controller
{
	public function page(Request $request)
	{
		$page = Page::slug('b2b-mentorship')->published()->firstOrFail();
		$mentorProfile = null;
		$user = $request->user();
		if ($user) {
			$user->load('mentorProfile.topics', 'mentorProfile.topicTags');
			$mentorProfile = $user->mentorProfile;
		}

		return Inertia::render('B2BMentorship', [
			'page' => $page,
			'mentorProfile' => $mentorProfile,
			'b2BMentorshipFormData' => [
				'isInterested' => [['label' => 'Yes', 'value' => true], ['label' => 'No', 'value' => false]],
				'preferred_modes' => ['Virtual', 'In-Person'],
				'interested_institutions' => ['Start-ups', 'Corporate', 'Universities/Colleges'],
				'minimum_hourly_rate' => [['label' => 'Virtual', 'rate' => ""], ['label' => 'In-Person', 'rate' => ""]],
				'open_to_long_duration_mentorship' => [['label' => 'Yes', 'value' => true], ['label' => 'No', 'value' => false]]
			],
		]);
	}

	public function store(Request $request)
	{
		$user = $request->user();
		if ($user) {
			$request->merge(['user_id' => $user->id]);
			$user->load('mentorProfile.topics', 'mentorProfile.topicTags');
			$mentorProfile = $user->mentorProfile;

			if ($mentorProfile) {
				$request->merge(['mentor_profile_id' => $mentorProfile->id]);
			}

			$request->merge([
				'first_name' => $user->first_name,
				'last_name' => $user->last_name,
			]);
		}
		$b2bMentorshipQuery = B2BMentorshipQuery::create($request->all());

		if (!empty($request->topic_ids)) {
			$b2bMentorshipQuery->topics()->sync($request->topic_ids);
		}

		if (!empty($request->topic_tag_ids)) {
			$b2bMentorshipQuery->topicTags()->sync($request->topic_tag_ids);
		}

		// return redirect(route('b2b-mentorship.page'))->with(['flash_type' => 'success', 'flash_message' => 'Your request has been saved successfully.']);
		return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Your request has been saved successfully.']);
	}
}
