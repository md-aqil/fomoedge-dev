<?php

namespace App\Repositories;

use App\Models\Tax;
use Illuminate\Support\Facades\Log;

class TaxRepository extends BaseRepository
{
    public $model;

    function __construct(Tax $model)
    {
        $this->model = $model;
    }
}
