<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Support\Facades\Log;

class TransactionRepository extends BaseRepository
{
    public $model;

    function __construct(Transaction $model)
    {
        $this->model = $model;
    }
}
