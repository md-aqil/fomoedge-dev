<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(protected UserRepository $userRepository) {}

    public function view(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Mentor/Profile', ['user' => $user]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string'
        ]);

        $user->fill($request->all());
        $user->save();

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Profile updated successfully', 'flash_description' => $user->full_name]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        $user->password = bcrypt($request->password);
        $user->save();

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Password updated successfully', 'flash_description' => $user->full_name]);
    }
}
