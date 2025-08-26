<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Repositories\MentorProfileRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorUserController extends Controller
{
    public function __construct(protected UserRepository $userRepository, protected MentorProfileRepository $mentorProfileRepository) {}

    public function create()
    {
        return Inertia::render('Mentor/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|string|min:8',
            'alias_name' => 'sometimes|string',
            'phone_country_id' => 'required|integer|exists:countries,id',
            'phone' => 'required|string|min:10|max:15',
            'social_links' => 'required|array|min:1',
            'social_links.*.label' => 'required|string',
            'social_links.*.url' => 'required|url',
            'social_links.*.status' => 'required|boolean',
        ], [
            'social_links.required' => 'At least one social link is required',
            'social_links.*.label.required' => 'Social link label is required',
            'social_links.*.url.required' => 'Social link url is required',
            'social_links.*.url.url' => 'Invalid social link url',
        ]);

        $user = $this->userRepository->createMentorUser($request->only(['first_name', 'last_name', 'email', 'password']));
        $request->merge(['user_id' => $user->id]);
        $mentorProfile = $this->mentorProfileRepository->saveAndUpdate($request);

        return redirect()->route('mentors.welcome', $mentorProfile->encrypted_id)->with(['flash_type' => 'success', 'flash_message' => 'Mentor profile created successfully', 'flash_description' => $user->full_name]);
    }

    public function welcomeMessage($encryptId)
    {
        try {
            $mentorProfileId = decrypt($encryptId);
        } catch (\Throwable $th) {
            abort(404);
        }

        $mentorProfile = $this->mentorProfileRepository->findOrFail($mentorProfileId);

        return Inertia::render('Mentor/WelcomeMentorMessage');
    }
}
