<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Repositories\CourseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(protected CourseRepository $courseRepository) {}

    public function index(Request $request)
    {
        $courses = $this->courseRepository->filter($request)->with('mentorProfile', 'price')->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();
        return Inertia::render('Admin/Courses/Courses', ['courses' => CourseResource::collection($courses)]);
    }

    public function view(Request $request, $id)
    {
        $course = $this->courseRepository->model()->with(['mentorProfile', 'price', 'featuredImage', 'bundleCourses', 'topics', 'tags', 'timings'])->findOrFail($id);

        $courseResource = new CourseResource($course);
        $courseResource->wrap(null);

        return Inertia::render('Admin/Courses/Course', ['course' => $courseResource]);
    }

    public function edit(UpdateCourseRequest $updateCourseRequest, $id)
    {
        $course = $this->courseRepository->findOrFail($id);

        $updateCourseRequest->merge(['activated_at' => $updateCourseRequest->activated_at ? now() : null]);

        $course->fill($updateCourseRequest->all());
        $course->save();

        return redirect()->route('admin.courses.view', $course->id)->with(['flash_type' => 'success', 'flash_message' => 'Course updated successfully', 'flash_description' => $course->title]);
    }
}
