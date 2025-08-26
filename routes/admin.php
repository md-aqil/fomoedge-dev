<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\B2BMentorshipQueryController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\ContactQueryController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MenteeController;
use App\Http\Controllers\Admin\MentorProfileController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\NoteController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PlatformRateController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\RatingController;
use App\Http\Controllers\Admin\Role\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TaxController;
use App\Http\Controllers\Admin\TopicController;
use App\Http\Controllers\Admin\TopicTagsController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\Users\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware(['web', 'auth', AdminMiddleware::class])->group(function () {
	Route::prefix('users')->name('users.')->controller(UserController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit users']);
		Route::post('store', 'store')->name('store')->middleware(['can:create users']);
		Route::get('create', 'create')->name('create')->middleware(['can:create users']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit users']);
		Route::get('', 'index')->name('index')->middleware(['can:view users']);
	});

	Route::prefix('roles')->name('roles.')->controller(RoleController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit roles']);
		Route::post('store', 'store')->name('store')->middleware(['can:create roles']);
		Route::get('create', 'create')->name('create')->middleware(['can:create roles']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit roles']);
		Route::get('', 'index')->name('index')->middleware(['can:view roles']);
	});

	Route::prefix('categories')->name('categories.')->controller(CategoryController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit categories']);
		Route::post('store', 'store')->name('store')->middleware(['can:create categories']);
		Route::get('create', 'create')->name('create')->middleware(['can:create categories']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit categories']);
		Route::get('', 'index')->name('index')->middleware(['can:view categories']);
	});

	Route::prefix('pages')->name('pages.')->controller(PageController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit pages']);
		Route::post('store', 'store')->name('store')->middleware(['can:create pages']);
		Route::get('create', 'create')->name('create')->middleware(['can:create pages']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit pages']);
		Route::get('', 'index')->name('index')->middleware(['can:view pages']);
	});

	Route::prefix('post-categories')->name('postCategories.')->controller(PostCategoryController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit post categories']);
		Route::post('store', 'store')->name('store')->middleware(['can:create post categories']);
		Route::get('create', 'create')->name('create')->middleware(['can:create post categories']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit post categories']);
		Route::get('', 'index')->name('index')->middleware(['can:view post categories']);
	});

	Route::prefix('posts')->name('posts.')->controller(PostController::class)->group(function () {
		Route::delete('delete-permanently/{id}', 'deletePermanently')->name('deletePermanently')->middleware(['can:delete posts']);
		Route::delete('delete/{id}', 'delete')->name('delete')->middleware(['can:delete posts']);
		Route::post('restore/{id}', 'restore')->name('restore')->middleware(['can:edit posts']);
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit posts']);
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit posts']);
		Route::post('store', 'store')->name('store')->middleware(['can:create posts']);
		Route::get('trashed', 'trashed')->name('trashed')->middleware(['can:view posts']);
		Route::get('create', 'create')->name('create')->middleware(['can:create posts']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit posts']);
		Route::get('', 'index')->name('index')->middleware(['can:view posts']);
	});

	Route::prefix('activity-logs')->name('activityLogs.')->controller(ActivityController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view activity logs']);
	});

	Route::prefix('notes')->name('notes.')->controller(NoteController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit notes']);
		Route::post('store', 'store')->name('store')->middleware(['can:create notes']);
		Route::get('create', 'create')->name('create')->middleware(['can:create notes']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:view notes']);
		Route::get('', 'index')->name('index')->middleware(['can:view notes']);
	});

	Route::prefix('clients')->name('clients.')->controller(ClientController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:edit clients']);
		Route::post('store', 'store')->name('store')->middleware(['can:create clients']);
		Route::get('create', 'create')->name('create')->middleware(['can:create clients']);
		Route::get('{id}', 'edit')->name('edit')->middleware(['can:edit clients']);
		Route::get('', 'index')->name('index')->middleware(['can:view clients']);
	});

	Route::prefix('menus')->name('menus.')->controller(MenuController::class)->group(function () {
		Route::get('create', 'create')->name('create')->middleware(['can:create menus']);
		Route::post('{menu}', 'update')->name('update')->middleware(['can:edit menus']);
		Route::get('{menu}', 'edit')->name('edit')->middleware(['can:edit menus']);
		Route::post('', 'store')->name('store')->middleware(['can:create menus']);
		Route::get('', 'index')->name('index')->middleware(['can:view menus']);
	});

	Route::prefix('comments')->name('comments.')->controller(CommentController::class)->group(function () {
		Route::post('store', 'store')->name('store')->middleware(['can:create comments']);
	});

	Route::prefix('settings')->name('settings.')->controller(SettingController::class)->group(function () {
		Route::post('{groupKey?}', 'update')->name('update');
		Route::get('{groupKey?}', 'view')->name('view');
	});

	Route::prefix('tags')->name('tags.')->controller(TagController::class)->group(function () {
		Route::get('store', 'store')->name('store')->middleware(['can:store tags']);
		Route::get('', 'index')->name('index')->middleware(['can:view tags']);
	});

	Route::prefix('taxes')->name('taxes.')->controller(TaxController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:update taxes']);
		Route::post('store', 'store')->name('store')->middleware(['can:store taxes']);
		Route::get('', 'index')->name('index')->middleware(['can:view taxes']);
	});

	Route::prefix('platform-rates')->name('platform-rates.')->controller(PlatformRateController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:update platform-rates']);
		Route::post('store', 'store')->name('store')->middleware(['can:store platform-rates']);
		Route::get('', 'index')->name('index')->middleware(['can:view platform-rates']);
	});

	Route::prefix('topics')->name('topics.')->controller(TopicController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:update topics']);
		Route::get('edit/{id}', 'edit')->name('edit')->middleware(['can:edit topics']);
		Route::post('store', 'store')->name('store')->middleware(['can:store topics']);
		Route::get('create', 'create')->name('create')->middleware(['can:create topics']);
		Route::get('', 'index')->name('index')->middleware(['can:view topics']);
		Route::prefix('tags/{topicId}')->name('tags.')->controller(TopicTagsController::class)->group(function () {
			Route::post('update/{id}', 'update')->name('update')->middleware(['can:update topic tags']);
			Route::post('store', 'store')->name('store')->middleware(['can:store topic tags']);
			Route::get('', 'index')->name('index')->middleware(['can:view topic tags']);
		});
	});

	Route::prefix('mentor-profiles')->name('mentor-profiles.')->controller(MentorProfileController::class)->group(function () {
		Route::post('razorpay-kyc/{id}', 'submitToRazorPayRouteKyc')->name('razorpay-kyc')->middleware(['can:update mentor razorpay route kyc']);
		Route::post('update-activated-at/{id}', 'updateActivatedAt')->name('update-activated-at')->middleware(['can:update mentor profiles']);
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:update mentor profiles']);
		Route::get('edit/{id}', 'edit')->name('edit')->middleware(['can:edit mentor profiles']);
		Route::post('store', 'store')->name('store')->middleware(['can:store mentor profiles']);
		Route::get('create', 'create')->name('create')->middleware(['can:create mentor profiles']);
		Route::get('', 'index')->name('index')->middleware(['can:view mentor profiles']);
	});

	Route::prefix('courses')->name('courses.')->controller(CourseController::class)->group(function () {
		Route::post('update/{id}', 'update')->name('update')->middleware(['can:update courses']);
		Route::get('view/{id}', 'view')->name('view')->middleware(['can:view courses']);
		Route::get('', 'index')->name('index')->middleware(['can:view courses']);
	});

	Route::prefix('bookings')->name('bookings.')->controller(BookingController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view bookings']);
		Route::get('view/{id}', 'view')->name('view')->middleware(['can:view bookings']);
	});

	Route::prefix('transactions')->name('transactions.')->controller(TransactionController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view transactions']);
		Route::get('pay-to-mentor/{id}', 'payToMentor')->name('pay-to-mentor')->middleware(['can:pay to mentor']);
	});

	Route::prefix('ratings')->name('ratings.')->controller(RatingController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view ratings']);
	});

	Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
		Route::get('view', 'view')->name('view')->middleware(['can:view profile']);
		Route::post('update', 'update')->name('update')->middleware(['can:edit profile']);
		Route::post('update-password', 'updatePassword')->name('update.password')->middleware(['can:edit profile password']);
	});

	Route::prefix('mentees')->name('mentees.')->controller(MenteeController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view mentees']);
		Route::get('view/{id}', 'view')->name('view')->middleware(['can:view mentees']);
	});

	Route::prefix('contact-queries')->name('contact-queries.')->controller(ContactQueryController::class)->group(function () {
		Route::get('', 'index')->name('index')->middleware(['can:view contact queries']);
	});

	Route::prefix('b2b-mentorship-queries')->name('b2b-mentorship-queries.')->controller(B2BMentorshipQueryController::class)->group(function () {
		Route::get('external-queries', 'externalQueries')->name('externalQueries')->middleware(['can:view b2b-mentorship queries']);
		Route::get('internal-queries', 'internalQueries')->name('internalQueries')->middleware(['can:view b2b-mentorship queries']);
		Route::get('/', 'index')->name('index')->middleware(['can:view b2b-mentorship queries']);
	});

	Route::get('dashboard', DashboardController::class)->name('dashboard');
});
