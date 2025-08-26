<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Notifications\MenteeBookingReminderNotification;
use App\Notifications\MentorBookingReminderNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class BookingReminderJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $bookings = Booking::with('courseTiming')->whereHas('courseTiming', function ($query) {
            $query->whereRaw('DATE(course_timings.start_date) = "' . date('Y-m-d') .'"')                
                ->whereRaw('TIME(course_timings.start_time) >= "' . date('H:i:s') . '"');
        })->get();

        foreach ($bookings as $booking) {
            $booking->user->notify(new MenteeBookingReminderNotification($booking));
            $booking->mentorProfile->user->notify(new MentorBookingReminderNotification($booking));
        }
    }
}
