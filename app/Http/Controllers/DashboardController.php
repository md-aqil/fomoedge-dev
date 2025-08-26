<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->hasRole('mentor')) {
            return redirect()->intended(route('mentors.dashboard'));
        }

        if ($user->hasRole('user')) {
            return redirect()->intended(route('user.dashboard'));
        }

        return redirect('/');
    }
}
