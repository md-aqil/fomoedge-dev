<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMentorKycDetailRequest;
use App\Http\Resources\MentorKycDetailResource;
use App\Repositories\MentorKycDetailRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorKycDetailController extends Controller
{
    public function __construct(protected MentorKycDetailRepository $mentorKycDetailRepository) {}

    public function createAndEdit(Request $request)
    {
        $user = $request->user()->load('mentorProfile.kycDetail.countryRelation', 'mentorProfile.kycDetail.panCard');
        $mentorProfile = $user->mentorProfile;

        $mentorProfileKycResource = new MentorKycDetailResource($mentorProfile->kycDetail);
        $mentorProfileKycResource->wrap(null);

        return Inertia::render('Mentor/Kyc/KycDetails', ['mentorKycDetail' => $mentorProfileKycResource]);
    }

    public function store(CreateMentorKycDetailRequest $createMentorKycDetailRequest)
    {
        $user = $createMentorKycDetailRequest->user()->load('mentorProfile');
        $mentorProfile = $user->mentorProfile;

        $createMentorKycDetailRequest->merge([
            'mentor_profile_id' => $mentorProfile->id,
        ]);

        $response = $this->mentorKycDetailRepository->storeWithRazorPay($createMentorKycDetailRequest);

        if ($response['status']) {
            return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Mentor KYC created successfully']);
        } else {
            return redirect()->back()->with(['flash_type' => 'failed', 'flash_message' => $response['message'] ?? 'Mentor KYC failed to create']);
        }
    }
}
