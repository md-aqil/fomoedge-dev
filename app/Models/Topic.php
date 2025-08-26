<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Topic extends Model
{
    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->whereNotNull('activated_at');
    }

    public function tags(): HasMany
    {
        return $this->hasMany(TopicTag::class);
    }

    public function activeTags(): HasMany
    {
        return $this->tags()->active();
    }
}
