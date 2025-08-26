<?php

use App\Http\Controllers\User\BookingController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\RatingController;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->name('user.')->middleware(['web', 'auth', UserMiddleware::class])->group(function () {
    Route::prefix('ratings')->name('ratings.')->controller(RatingController::class)->group(function () {
        Route::post('store', 'store')->name('store');
        Route::post('update', 'update')->name('update');
    });

    Route::prefix('bookings')->name('bookings.')->controller(BookingController::class)->group(function () {
        Route::get('view/{bookingId}', 'view')->name('view');
        Route::get('', 'index')->name('index');
    });

    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('view', 'view')->name('view')->middleware(['can:view profile']);
        Route::post('update', 'update')->name('update')->middleware(['can:edit profile']);
        Route::post('update-password', 'updatePassword')->name('update.password')->middleware(['can:edit profile password']);
    });

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
