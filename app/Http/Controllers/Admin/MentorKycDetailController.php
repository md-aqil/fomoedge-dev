<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMentorKycDetailRequest;
use App\Repositories\MentorKycDetailRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorKycDetailController extends Controller
{
    public function __construct(protected MentorKycDetailRepository $mentorKycDetailRepository) {}

    public function create(Request $request, $mentorId)
    {
        return Inertia::render('Admin/MentorProfiles/MentorKycDetail');
    }

    public function store(CreateMentorKycDetailRequest $createMentorKycDetailRequest)
    {
        $this->mentorKycDetailRepository->create($createMentorKycDetailRequest->all());
    }
}
