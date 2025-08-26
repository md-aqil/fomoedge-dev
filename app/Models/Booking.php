<?php

namespace App\Models;

use App\Enums\BookingStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'create_payment_gateway' => 'object',
        'google_meet_response' => 'object'
    ];

    protected $appends = ['encrypted_id'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $course = Course::with('mentorProfile.tax', 'mentorProfile.platformFee')->find($model->course_id);
            $mentorProfile = $course->mentorProfile;

            $model->course_value = $course->value;
            $model->price = $course->price->price;
            $model->special_price = $course->price->isSpecialPriceValid ? $course->price->special_price : 0;

            if ($mentorProfile->tax) {
                $tax = $mentorProfile->tax;
            } else {
                $tax = Tax::default()->active()->first();
            }

            if ($tax) {
                $model->tax_id = $tax->id;
                $model->tax_amount = $course->price->actualPrice * ($tax->value / 100);
            }

            if ($mentorProfile->platformFee) {
                $platformFee = $mentorProfile->platformFee;
            } else {
                $platformFee = PlatformFee::default()->active()->first();
            }

            if ($platformFee) {
                $model->platform_fee_id = $platformFee->id;
                if ($platformFee->type == 'percentage' || $platformFee->type == 'PERCENTAGE') {
                    $model->platform_fee_amount = $course->price->actualPrice * ($platformFee->value / 100);
                }

                if ($platformFee->type == 'fixed' || $platformFee->type == 'FIXED') {
                    $model->platform_fee_amount = $platformFee->value;
                }
            }

            $model->grand_total_amount = $course->price->actualPrice + $model->tax_amount + $model->platform_fee_amount;
        });
    }

    public function getEncryptedIdAttribute()
    {
        return encrypt($this->id);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mentorProfile(): BelongsTo
    {
        return $this->belongsTo(MentorProfile::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function mentorProfileRating(): HasOne
    {
        return $this->hasOne(Rating::class)->where('rateable_type', MentorProfile::class)->latest();
    }

    public function courseRating(): HasOne
    {
        return $this->hasOne(Rating::class)->where('rateable_type', Course::class)->latest();
    }

    public function courseTiming(): BelongsTo
    {
        return $this->belongsTo(CourseTiming::class);
    }

    public function scopeStatus($q, $status)
    {
        return $q->where('status', $status);
    }

    public function getStatusLabelAttribute()
    {
        return BookingStatusEnum::from($this->status)->label() ?? "";
    }
}
