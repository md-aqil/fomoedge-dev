<?php

namespace App\Http\Middleware;

use App\Repositories\UserRepository;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MentorMiddleware
{
    public function __construct(
        protected UserRepository $userRepository
    ) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user->hasRole('mentor') && $user->mentorProfile->activated_at) {
            return $next($request);
        }

        $this->userRepository->logout($request);

        return redirect()->route('login')->with(['flash_type' => 'failed', 'flash_message' => 'You are not authorized to access this page']);
    }
}
