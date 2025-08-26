<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\MentorProfileResource;
use App\Models\Course;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
	function __invoke(Request $request)
	{
		$page = Page::published()->firstOrCreate(['slug' => 'search'], ['title' => 'Search', 'body' => '', 'status' => 1, 'user_id' => 1]);
		$page->increment('views');
		$keyword = $request->input('keyword');

		$courses = Course::whereLike(['title', 'description'], $keyword)->latest()->get();

		$courses = Course::where('title', 'like', '%' . $keyword . '%')
			->with([
				'mentorProfile.profilePicture',
				'price',
				'featuredImage',
				'bundleCourses',
				'topics',
				'tags',
				'timings'
			])
			->get();
		$relatedMentors = $courses->pluck('mentorProfile')->filter()->unique('id')->values();
		return Inertia::render(
			'Search',
			[
				'courses' => CourseResource::collection($courses),
				'keyword' => $keyword,
				'mentors' => MentorProfileResource::collection($relatedMentors),
				'page' => $page
			]
		);
	}
}
