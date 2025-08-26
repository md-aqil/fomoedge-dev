<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoursePrice extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    public function getIsSpecialPriceValidAttribute()
    {
        if ($this->special_price && $this->special_price_start_at && $this->special_price_end_at) {
            return $this->special_price_start_at <= now() && $this->special_price_end_at >= now();
        } else {
            return false;
        }
    }

    public function getActualPriceAttribute()
    {
        if ($this->isSpecialPriceValid) {
            return $this->special_price;
        } else {
            return $this->price;
        }
    }
}
