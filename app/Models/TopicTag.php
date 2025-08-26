<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TopicTag extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'tag_cta' => 'array',
        'tag_cta_description' => 'string',
        'faqs' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->whereNotNull('activated_at');
    }

    public function mentors(): BelongsToMany
    {
        return $this->belongsToMany(MentorProfile::class, 'mentor_profile_topic_tags', 'topic_tag_id', 'mentor_profile_id');
    }
}
