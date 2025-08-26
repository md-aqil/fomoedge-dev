<?php

namespace App\Repositories;

use App\Models\Rating;
use Illuminate\Support\Facades\Log;

class RatingRepository extends BaseRepository
{
    public $model;

    function __construct(Rating $model)
    {
        $this->model = $model;
    }
}
