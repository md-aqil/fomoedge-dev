<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorProfileTopicTag extends Model
{
    protected $fillable = ['mentor_profile_id', 'topic_tag_id'];
}
