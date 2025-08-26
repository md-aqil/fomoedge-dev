<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->whereNotNull('activated_at');
    }

    public function scopeDefault($query)
    {
        return $query->where('is_default', 1);
    }
}
