<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
	use HasFactory, SoftDeletes;

	protected $guarded = ['id'];

	protected $appends = ['full_path'];

	public function getFullPathAttribute()
	{
		return url('storage/' . $this->url);
	}

	function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	function attachmentable(): MorphTo
	{
		return $this->morphTo();
	}
}
