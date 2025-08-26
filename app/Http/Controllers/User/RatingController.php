<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRatingRequest;
use App\Http\Requests\UpdateRatingRequest;
use App\Models\Course;
use App\Models\MentorProfile;
use App\Repositories\RatingRepository;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function __construct(protected RatingRepository $ratingRepository) {}

    public function store(CreateRatingRequest $createRatingRequest)
    {
        if ($createRatingRequest->type == 'mentor_profiles') {
            $mentorProfile = MentorProfile::findOrFail($createRatingRequest->model_id);
            $mentorProfile->rating()->create($createRatingRequest->validated());

            return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Rating added successfully']);
        }

        if ($createRatingRequest->type == 'courses') {
            $course = Course::findOrFail($createRatingRequest->model_id);
            $course->rating()->create($createRatingRequest->validated());

            return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Rating added successfully']);
        }

        return redirect()->back()->with(['flash_type' => 'failed', 'flash_message' => 'Rating model not found.']);
    }

    public function update(UpdateRatingRequest $updateRatingRequest, $id)
    {
        $rating = $this->ratingRepository->update($id, $updateRatingRequest->validated());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Rating updated successfully']);
    }
}
