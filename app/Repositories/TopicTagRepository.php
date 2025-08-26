<?php

namespace App\Repositories;

use App\Models\TopicTag;
use Illuminate\Support\Facades\Log;

class TopicTagRepository extends BaseRepository
{
    public $model;

    function __construct(TopicTag $model)
    {
        $this->model = $model;
    }
}
