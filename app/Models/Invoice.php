<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = ['transaction_id', 'amount', 'special_amount', 'tax_amount', 'platform_fee_amount', 'grand_total_amount'];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        if (!$this->invoice_path)
            return null;
        return url('storage/' . $this->invoice_path);
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
