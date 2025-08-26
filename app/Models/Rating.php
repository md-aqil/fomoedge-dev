<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Rating extends Model
{
    protected $fillable = [
        'user_id',
        'booking_id',
        'rateable_id',
        'rateable_type',
        'title',
        'description',
        'value',
        'approved_by_user_id',
    ];

    public static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            $model->rateable->update(['average_rating' => $model->rateable->ratings()->sum('value') / $model->rateable->ratings()->count()]);
        });
    }

    public function rateable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
