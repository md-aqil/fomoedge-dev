<?php

use App\Jobs\BookingReminderJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::job(new BookingReminderJob)->everyFifteenMinutes();

// Clear stale jobs that have been reserved for too long
Schedule::call(function () {
    DB::table('jobs')
        ->where('reserved_at', '<=', now()->subMinutes(10))
        ->update(['reserved_at' => null]);
})->everyFiveMinutes();