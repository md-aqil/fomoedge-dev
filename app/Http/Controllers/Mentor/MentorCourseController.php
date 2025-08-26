<?php

namespace App\Http\Controllers\Mentor;

use App\Enums\CourseTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Repositories\CourseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorCourseController extends Controller
{
	public function __construct(protected CourseRepository $courseRepository) {}

	public function index(Request $request)
	{
		$courses = $this->courseRepository->filter($request, ['mentorProfile.user', 'price'])->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

		return Inertia::render('Mentor/Courses/Courses', ['courses' => CourseResource::collection($courses)]);
	}

	public function create(Request $request)
	{
		$mentorProfile = $request->user()->mentorProfile;
		$courseTypeEnum = enumLabelArray(CourseTypeEnum::cases());
		return Inertia::render('Mentor/Courses/Course', ['courseTypeEnum' => $courseTypeEnum, 'mentorProfile' => $mentorProfile]);
	}

	public function store(CreateCourseRequest $createCourseRequest)
	{
		$course = $this->courseRepository->saveAndUpdate($createCourseRequest);

		return redirect()->route('mentors.courses.edit', $course->encrypted_id)->with(['flash_type' => 'success', 'flash_message' => 'Course created successfully!', 'flash_description' => $course->title]);
	}

	public function edit(Request $request, $id)
	{
		try {
			$id = decrypt($id);
		} catch (\Throwable $th) {
			abort(404);
		}

		$course = $this->courseRepository->model()->with([
			'featuredImage',
			'bundleCourses',
			'price',
			'topics',
			'tags',
			'timings'
		])->findOrFail($id);

		$courseResource = new CourseResource($course);
		$courseResource->wrap(null);

		$mentorProfile = $request->user()->mentorProfile;
		$courseTypeEnum = enumLabelArray(CourseTypeEnum::cases());

		return Inertia::render('Mentor/Courses/Course', ['course' => $courseResource, 'courseTypeEnum' => $courseTypeEnum, 'mentorProfile' => $mentorProfile]);
	}

	public function update(UpdateCourseRequest $updateCourseRequest, $id)
	{
		$course = $this->courseRepository->saveAndUpdate($updateCourseRequest, $id);

		return redirect()->route('mentors.courses.edit', $course->encrypted_id)->with(['flash_type' => 'success', 'flash_message' => 'Course updated successfully!', 'flash_description' => $course->title]);
	}

	public function delete(Request $request, $id)
	{
		$course = Course::where('mentor_profile_id', $request->user()->mentorProfile->id)->where('id', $id)->firstOrFail();

		$course->delete();

		return redirect(route('mentors.courses.index'))->with(['flash_type' => 'success', 'flash_message' => 'Course deletee successully', 'flash_description' => $course->title]);
	}
}
