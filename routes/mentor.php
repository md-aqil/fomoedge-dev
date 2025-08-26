<?php

use App\Http\Controllers\Mentor\BookingController;
use App\Http\Controllers\Mentor\CourseTimeController;
use App\Http\Controllers\Mentor\MentorCourseController;
use App\Http\Controllers\Mentor\MentorKycDetailController;
use App\Http\Controllers\Mentor\MentorProfileController;
use App\Http\Controllers\Mentor\MentorUserController;
use App\Http\Controllers\Mentor\ProfileController;
use App\Http\Controllers\Mentor\TopicAndTagController;
use App\Http\Controllers\Mentor\PostController;
use App\Http\Middleware\MentorMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('mentors')->name('mentors.')->group(function () {
	Route::prefix('register')->name('register.')->group(function () {
		Route::get('', [MentorUserController::class, 'create'])->name('create');
		Route::post('', [MentorUserController::class, 'store'])->name('store');
	});

	Route::get('welcome/{encryptId}', [MentorUserController::class, 'welcomeMessage'])->name('welcome');

	Route::middleware(['web', 'auth', MentorMiddleware::class])->group(function () {
		Route::get('dashboard', [MentorProfileController::class, 'dashboard'])->name('dashboard');
		Route::get('b2b-availability', [MentorProfileController::class, 'B2bAvailability'])->name('b2b-availability');
		Route::get('profile', [MentorProfileController::class, 'edit'])->name('profile');
		Route::post('update', [MentorProfileController::class, 'update'])->name('update');
		Route::get('profile/kyc-details', [MentorKycDetailController::class, 'createAndEdit'])->name('profile.kyc-details');
		Route::post('profile/kyc-details', [MentorKycDetailController::class, 'store'])->name('profile.kyc-details.store');

		Route::prefix('courses')->name('courses.')->controller(MentorCourseController::class)->group(function () {
			Route::get('', 'index')->name('index');
			Route::get('create', 'create')->name('create');
			Route::post('store', 'store')->name('store');
			Route::get('edit/{id}', 'edit')->name('edit');
			Route::post('update/{id}', 'update')->name('update');
			Route::post('delete/{id}', 'delete')->name('delete');
			Route::prefix('{courseId}/timings')->name('timings.')->controller(CourseTimeController::class)->group(function () {
				Route::post('delete/{id}', 'delete')->name('delete');
			});
		});

		Route::prefix('bookings')->name('bookings.')->controller(BookingController::class)->group(function () {
			Route::get('view/{bookingId}', 'view')->name('view');
			Route::get('', 'index')->name('index');
		});

		Route::prefix('topics-and-tags')->name('topics-and-tags.')->controller(TopicAndTagController::class)->group(function () {
			Route::get('', 'index')->name('index');
		});

		Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function () {
			Route::delete('delete-permanently/{id}', 'deletePermanently')->name('deletePermanently');
			Route::delete('delete/{id}', 'delete')->name('delete');
			Route::post('restore/{id}', 'restore')->name('restore');
			Route::post('update/{id}', 'update')->name('update');
			Route::post('update/{id}', 'update')->name('update');
			Route::post('store', 'store')->name('store');
			Route::get('trashed', 'trashed')->name('trashed');
			Route::get('create', 'create')->name('create');
			Route::get('{id}', 'edit')->name('edit');
			Route::get('', 'index')->name('index');
		});

		Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
			Route::get('view', 'view')->name('view')->middleware(['can:view profile']);
			Route::post('update', 'update')->name('update')->middleware(['can:edit profile']);
			Route::post('update-password', 'updatePassword')->name('update.password')->middleware(['can:edit profile password']);
		});
	});
});
