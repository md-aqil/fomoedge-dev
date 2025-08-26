<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class B2BMentorshipQuery extends Model
{
	protected $table = 'b2b_mentorship_queries';

	protected $guarded = ['id'];

	protected function casts(): array
	{
		return [
			'isInterested' => 'boolean',
			'preferred_modes' => 'array',
			'interested_institutions' => 'array',
			'minimum_hourly_rate' => 'json',
			'open_to_long_duration_mentorship' => 'boolean',
			'meta' => 'json'
		];
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function mentorProfile()
	{
		return $this->belongsTo(MentorProfile::class);
	}

	public function topics(): BelongsToMany
	{
		return $this->belongsToMany(Topic::class, 'b2b_mentorship_query_topics', 'b2b_mentorship_query_id', 'topic_id');
	}

	public function topicTags(): BelongsToMany
	{
		return $this->belongsToMany(TopicTag::class, 'b2b_mentorship_query_topic_tags', 'b2b_mentorship_query_id', 'topic_tag_id');
	}
}
