<?php

namespace App\Models;

use App\Enums\CourseTypeEnum;
use App\Traits\AttachmentTrait;
use App\Traits\RatingTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
	use AttachmentTrait, RatingTrait, SoftDeletes;

	protected $guarded = ['id'];

	protected $appends = ['encrypted_id'];

	public function mentorProfile(): BelongsTo
	{
		return $this->belongsTo(MentorProfile::class);
	}

	public function bundleCourses(): BelongsToMany
	{
		return $this->belongsToMany(Course::class, 'course_bundles', 'course_id', 'bundle_id')->withPivot('quantity', 'id');
	}

	public function price(): HasOne
	{
		return $this->hasOne(CoursePrice::class)->latest();
	}

	public function prices(): HasMany
	{
		return $this->hasMany(CoursePrice::class);
	}

	public function topics(): BelongsToMany
	{
		return $this->belongsToMany(Topic::class, 'course_topics', 'course_id', 'topic_id');
	}

	public function tags(): BelongsToMany
	{
		return $this->belongsToMany(TopicTag::class, 'course_tags', 'course_id', 'topic_tags_id');
	}

	public function timings(): HasMany
	{
		return $this->hasMany(CourseTiming::class)->whereDate('start_date', '>=', now())->whereNotNull('activated_at');
	}

	public function getTypeLabelAttribute()
	{
		return CourseTypeEnum::from($this->type)->label() ?? "";
	}

	public function getEncryptedIdAttribute()
	{
		return encrypt($this->id);
	}
}
