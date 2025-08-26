<?php

namespace App\Repositories;

use App\Enums\AttachmentTypeEnum;
use App\Models\Course;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CourseRepository extends BaseRepository
{
    public $model;

    function __construct(Course $model)
    {
        $this->model = $model;
    }

    public function filter(Request $request, $with = [])
    {
        $model = $this->model->query();
        $user = Auth::user();

        if (!empty($with)) {
            $model->with($with);
        }

        if ($request->has('keyword') && $request->filled('keyword')) {
            $model->whereLike(['title'], $request->keyword);
        }

        if ($request->has('mentor_profile_id') && $request->filled('mentor_profile_id')) {
            $model->where('mentor_profile_id', $request->mentor_profile_id);
        } else {
            if ($user && $user->roles->contains('name', 'mentor') && str_contains($request->route()->getPrefix(), 'mentors')) {
                $model->where('mentor_profile_id', $user->mentorProfile->id);
            }
        }

        return $model;
    }

    public function saveAndUpdate($request, $id = null)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user()->load('mentorProfile');
            $mentorProfile = $user->mentorProfile;

            $courseRequest = new Request($request->except(['featured_image', 'bundle_types', 'price', 'special_price', 'special_price_start_at', 'special_price_end_at', 'topic_ids', 'topic_tag_ids', 'timing']));

            $courseRequest->merge(['mentor_profile_id' => $mentorProfile->id]);

            $course = $this->model->findOrNew($id);
            $course->fill($courseRequest->all());
            $course->save();

            if ($request->has('featured_image')) {
                $featuredImageRequest = new Request(['type' => AttachmentTypeEnum::FEATURED->value]);
                $this->uploadAttachment($course, $request->featured_image, $featuredImageRequest);
            }

            if (!empty($request->bundle_types)) {
                $data = [];
                foreach ($request->bundle_types as $key => $bundleType) {
                    $data[$bundleType['course_id']] = ['quantity' => $bundleType['quantity']];
                }
                $course->bundleCourses()->sync($data);
            }

            if ($request->price || $request->special_price || $request->special_price_start_at || $request->special_price_end_at) {
                $course->prices()->create([
                    'price' => $request->price,
                    'special_price' => $request->special_price,
                    'special_price_start_at' => $request->special_price_start_at,
                    'special_price_end_at' => $request->special_price_end_at
                ]);
            }

            if (!empty($request->topic_ids)) {
                $course->topics()->sync($request->topic_ids);
            }

            if (!empty($request->topic_tag_ids)) {
                $course->tags()->sync($request->topic_tag_ids);
            }

            if (!empty($request->timings)) {
                foreach ($request->timings as $timing) {
                    if (isset($timing['id']) && $timing['id']) {
                        $course->timings()->where('id', $timing['id'])->update($timing);
                    } else {
                        $timing['activated_at'] = now();
                        $course->timings()->create($timing);
                    }
                }
            }
            DB::commit();
            return $course;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
