<?php

use App\Http\Controllers\Api\CourseBundleController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegionController;
use App\Http\Controllers\Api\TopicAndTagController;

Route::prefix('regions')->name('regions.')->controller(RegionController::class)->group(function () {
    Route::get('countries', 'countries')->name('countries');
    Route::get('states', 'states')->name('states');
    Route::get('cities', 'cities')->name('cities');
});

Route::prefix('topics')->name('topics.')->controller(TopicAndTagController::class)->group(function () {
    Route::get('topic-list', 'topicList')->name('topic-list');
    Route::get('topic-tags-list', 'topicTagsList')->name('topic-tags-list');
    Route::post('create-topic', 'createTopic')->name('create-topic');
    Route::post('create-topic-tag', 'createTopicTag')->name('create-topic-tag');
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::prefix('courses')->name('courses.')->controller(CourseController::class)->group(function () {
        Route::prefix('bundles')->name('bundles.')->controller(CourseBundleController::class)->group(function () {
            Route::delete('delete/{courseBundleId}', 'delete')->name('delete');
        });
        Route::get('', 'index')->name('index');
    });
});
