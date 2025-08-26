<?php

namespace App\Repositories;

use App\Models\PlatformFee;
use Illuminate\Support\Facades\Log;

class PlatformFeeRepository extends BaseRepository
{
    public $model;

    function __construct(PlatformFee $model)
    {
        $this->model = $model;
    }
}
