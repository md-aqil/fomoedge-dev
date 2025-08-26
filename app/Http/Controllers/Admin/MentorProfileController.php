<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MentorProfileStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMentorProfileRequest;
use App\Http\Requests\UpdateMentorProfileRequest;
use App\Http\Resources\MentorProfileResource;
use App\Models\PlatformFee;
use App\Models\Tax;
use App\Repositories\MentorKycDetailRepository;
use App\Repositories\MentorProfileRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorProfileController extends Controller
{
    public function __construct(protected MentorProfileRepository $mentorProfileRepository, protected MentorKycDetailRepository $mentorKycDetailRepository) {}

    public function index(Request $request)
    {
        $response = $this->mentorProfileRepository->filter($request, ['topicTags'])->withCount('courses')->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/MentorProfiles/MentorProfiles', ['mentorProfiles' => MentorProfileResource::collection($response)]);
    }

    public function create()
    {
        return Inertia::render('Admin/MentorProfiles/MentorProfile');
    }

    public function store(CreateMentorProfileRequest $createMentorProfileRequest)
    {
        $mentorProfile = $this->mentorProfileRepository->saveAndUpdate($createMentorProfileRequest);

        return redirect()->route('admin.mentor-profiles.edit', $mentorProfile->id)->with(['flash_type' => 'success', 'flash_message' => 'Mentor profile created successfully', 'flash_description' => $mentorProfile->full_name]);
    }

    public function edit(Request $request, $id)
    {
        $mentorProfile = $this->mentorProfileRepository->model()->with('topics', 'topicTags', 'user', 'kycDetail', 'profilePicture', 'ratings', 'courses.price')->findOrFail($id);

        $mentorProfileResource = new MentorProfileResource($mentorProfile);
        $mentorProfileResource->wrap(null);

        $mentorProfileStatusEnums = enumLabelArray(MentorProfileStatusEnum::cases());

        $taxes = Tax::active()->latest()->get();
        $plateFormFees = PlatformFee::active()->latest()->get();

        return Inertia::render('Admin/MentorProfiles/MentorProfile', ['mentorProfile' => $mentorProfileResource, 'mentorProfileStatusEnums' => $mentorProfileStatusEnums, 'taxes' => $taxes, 'plateFormFees' => $plateFormFees]);
    }

    public function update(Request $updateMentorProfileRequest, $id)
    {
        $mentorProfile = $this->mentorProfileRepository->saveAndUpdate($updateMentorProfileRequest, $id);

        return redirect()->route('admin.mentor-profiles.edit', $mentorProfile->id)->with(['flash_type' => 'success', 'flash_message' => 'Mentor profile updated successfully', 'flash_description' => $mentorProfile->full_name]);
    }

    public function updateActivatedAt(Request $request, $id)
    {
        $mentorProfile = $this->mentorProfileRepository->findOrFail($id);

        $mentorProfile = $this->mentorProfileRepository->updateActivatedAt($mentorProfile, $request);

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Mentor profile status updated successfully', 'flash_description' => $mentorProfile->full_name]);
    }

    public function submitToRazorPayRouteKyc(Request $request, $id)
    {
        $mentorProfile = $this->mentorProfileRepository->findOrFail($id);

        $response = $this->mentorKycDetailRepository->storeAndUpdateRazorPayKyc($mentorProfile);

        return redirect()->back()->with(['flash_type' => $response['status'] ? 'success' : 'failed', 'flash_message' => $response['message'], 'flash_description' => $response['additional_message'] ?? '']);
    }
}
