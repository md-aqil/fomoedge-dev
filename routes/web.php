<?php

use App\Http\Controllers\B2BMentorshipQueryController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactQueryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MentorProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/admin.php';

Route::get('dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/mentor.php';
require __DIR__ . '/user.php';

Route::prefix('blog')->name('blog.')->controller(PostController::class)->group(function () {
	Route::get('/', 'index')->name('index');
	Route::get('/{slug}', 'show')->name('post');
});

Route::get('about-us', [PageController::class, 'aboutUs'])->name('aboutUs');
Route::get('how-it-works', [PageController::class, 'howItWorks'])->name('howItWorks');
Route::get('contact-us', [PageController::class, 'contactUs'])->name('contactUs');
Route::post('contact-us', [ContactQueryController::class, 'store'])->name('contactUsStore');

Route::prefix('course')->name('course.')->group(function () {
	Route::get('search', [CourseController::class, 'search'])->name('search');
	Route::get('{slug}', [CourseController::class, 'findBySlug'])->name('find-by-slug');
});

Route::prefix('mentors')->name('mentors.')->controller(MentorProfileController::class)->group(function () {
	Route::get('/{tagSlug?}', 'allMentorsByTag')->name('all-mentors-by-tag');
	// Route::get('', 'allMentors')->name('all-mentors');
});

Route::prefix('mentor')->name('mentor.')->controller(MentorProfileController::class)->group(function () {
	Route::get('{id}', 'findById')->name('find-by-id');
});

Route::prefix('booking')->name('booking.')->group(function () {
	Route::get('{courseSlug}', [BookingController::class, 'create'])->name('create');
	Route::post('{courseSlug}', [BookingController::class, 'store'])->name('store');
	Route::get('callback/{bookingId}', [BookingController::class, 'callback'])->name('callback');
	Route::get('success/{bookingId}', [BookingController::class, 'success'])->name('success');
});

// Route::redirect('/home', '/');
Route::get('/b2b-mentorship', [B2BMentorshipQueryController::class, 'page'])->name('b2b-mentorship.page');
Route::post('/b2b-mentorship', [B2BMentorshipQueryController::class, 'store'])->name('b2b-mentorship.store');
Route::get('/search', SearchController::class)->name('search');
Route::get('/', HomepageController::class)->name('homepage');

Route::get('{slug}', PageController::class)->name('page');
