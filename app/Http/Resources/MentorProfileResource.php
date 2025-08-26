<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MentorProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['topic_ids'] = $this->topics->pluck('id')->toArray();
        $data['topic_tag_ids'] = $this->topicTags->pluck('id')->toArray();

        return $data;
    }
}
