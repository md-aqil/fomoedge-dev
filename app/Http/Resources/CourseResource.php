<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        if ($this->relationLoaded('bundleCourses'))
            $data['bundle_types'] = $this->bundleCourses->pluck('id')->toArray();

        if ($this->relationLoaded('topics'))
            $data['topic_ids'] = $this->topics->pluck('id')->toArray();

        if ($this->relationLoaded('tags'))
            $data['topic_tag_ids'] = $this->tags->pluck('id')->toArray();

        if ($this->relationLoaded('timings')) {
            $data['timings'] = $this->timings->filter(function ($timing) {
                return Carbon::parse($timing->start_date . ' ' . $timing->start_time)->isAfter(now());
            })->values();
        }

        return $data;
    }
}
