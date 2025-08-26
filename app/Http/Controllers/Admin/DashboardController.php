<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookingStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Course;
use App\Models\MentorProfile;
use App\Models\Page;
use App\Models\Post;
use App\Models\Rating;
use App\Models\Topic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $totalCourse = Course::count();
        $totalTopic = Topic::count();
        $totalMentors = MentorProfile::query()->status()->count();
        $totalBooking = Booking::query()->status(BookingStatusEnum::PAID->value)->count();
        $totalRevenue = Booking::query()->status(BookingStatusEnum::PAID->value)->sum('grand_total_amount');
        $totalMentorRating = Rating::where('rateable_type', MentorProfile::class)->count();
        $totalCourseRating = Rating::where('rateable_type', Course::class)->count();

        $latestVerifiedMentors = MentorProfile::query()->status()->latest()->take(5)->get();
        $latestCourses = Course::query()->with('mentorProfile')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalCourse' => $totalCourse,
                'totalTopic' => $totalTopic,
                'totalMentors' => $totalMentors,
                'totalBooking' => $totalBooking,
                'totalRevenue' => $totalRevenue,
                'totalMentorRating' => $totalMentorRating,
                'totalCourseRating' => $totalCourseRating
            ],
            'latestVerifiedMentors' => $latestVerifiedMentors,
            'latestCourses' => $latestCourses
        ]);
    }
}
