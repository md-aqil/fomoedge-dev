<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Repositories\CourseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function __construct(protected CourseRepository $courseRepository) {}

    public function search(Request $request)
    {
        $request->validate([
            'keyword' => 'required|string|min:3'
        ]);

        $courses = $this->courseRepository->filter($request, ['mentorProfile'])->latest()->get();

        return response()->json(['courses' => CourseResource::collection($courses)]);
    }

    public function findBySlug(Request $request, string $slug)
    {
        $course = $this->courseRepository->where('slug', $slug)->with(['price', 'mentorProfile', 'topics', 'tags', 'timings', 'bundleCourses', 'featuredImage'])->firstOrFail();

        $courseResource = new CourseResource($course);
        $courseResource->wrap(null);


        return Inertia::render('Courses/Course', ['course' => $courseResource]);
    }
}
