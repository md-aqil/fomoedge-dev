<?php

namespace App\Repositories;

use App\Models\Topic;
use Illuminate\Support\Facades\Log;

class TopicRepository extends BaseRepository
{
    public $model;

    function __construct(Topic $model)
    {
        $this->model = $model;
    }
}
