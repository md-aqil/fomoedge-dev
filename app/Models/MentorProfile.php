<?php

namespace App\Models;

use App\Enums\MentorProfileStatusEnum;
use App\Observers\MentorProfileObserver;
use App\Traits\AttachmentTrait;
use App\Traits\RatingTrait;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class MentorProfile extends Model
{
	use AttachmentTrait, RatingTrait, SoftDeletes;

	protected $guarded = ['id'];

	protected $appends = ['full_name', 'encrypted_id'];

	protected $casts = ['languages' => 'array', 'educations' => 'array', 'topic_ids' => 'array', 'topic_tag_ids' => 'array', 'social_links' => 'object'];

	public static function boot()
	{
		parent::boot();

		static::creating(function ($model) {
			$model->unique_id = str()->random(10);
		});
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function getFullNameAttribute()
	{
		return $this->user?->full_name;
	}

	public function kycDetail(): HasOne
	{
		return $this->hasOne(MentorKycDetail::class)->latest();
	}

	public function courses(): HasMany
	{
		return $this->hasMany(Course::class)->latest();
	}

	public function getEncryptedIdAttribute()
	{
		return encrypt($this->id);
	}

	public function topics(): BelongsToMany
	{
		return $this->belongsToMany(Topic::class, 'mentor_profile_topics', 'mentor_profile_id', 'topic_id');
	}

	public function topicTags(): BelongsToMany
	{
		return $this->belongsToMany(TopicTag::class, 'mentor_profile_topic_tags', 'mentor_profile_id', 'topic_tag_id');
	}

	public function scopeStatus($query, $status = MentorProfileStatusEnum::APPROVED->value)
	{
		return $query->where('status', $status);
	}

	public function tax()
	{
		return $this->belongsTo(Tax::class);
	}

	public function platformFee()
	{
		return $this->belongsTo(PlatformFee::class);
	}

	public function phoneCountry()
	{
		return $this->belongsTo(Country::class, 'phone_country_id');
	}
}
