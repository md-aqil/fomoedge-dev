<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Repositories\CourseRepository;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function __construct(protected CourseRepository $courseRepository) {}

    public function index(Request $request)
    {
        $request->validate([
            'mentor_profile_id' => 'sometimes|required|integer|exists:mentor_profiles,id',
        ]);

        $courses = $this->courseRepository->filter($request)->get();

        return response()->json(['courses' => CourseResource::collection($courses)]);
    }
}
