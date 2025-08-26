<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenteeController extends Controller
{
    public function __construct(protected UserRepository $userRepository) {}

    public function index(Request $request)
    {
        $request->merge([
            'role_type' => 'user'
        ]);

        $mentees = $this->userRepository->filter($request, ['roles'])->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/Mentees/Mentees', ['mentees' => UserResource::collection($mentees)]);
    }

    public function view(Request $request, $id)
    {
        $mentee = $this->userRepository->model->with('bookings.course')->findOrFail($id);

        return Inertia::render('Admin/Mentees/Mentee', ['mentee' => new UserResource($mentee)]);
    }
}
