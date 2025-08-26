<?php

namespace App\Traits;

use App\Models\Course;
use App\Models\MentorProfile;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait RatingTrait
{
    public function rating(): MorphOne
    {
        return $this->morphOne(Rating::class, 'rateable');
    }

    public function ratings(): MorphMany
    {
        return $this->morphMany(Rating::class, 'rateable')->latest();
    }

    public function mentorProfileRating(): MorphOne
    {
        return $this->morphOne(Rating::class, 'rateable')->where('rateable_type', MentorProfile::class);
    }

    public function courseRating(): MorphOne
    {
        return $this->morphOne(Rating::class, 'rateable')->where('rateable_type', Course::class);
    }
}
