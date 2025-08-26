<?php

namespace App\Models;

use App\Traits\AttachmentTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MentorKycDetail extends Model
{
    use AttachmentTrait;

    protected $guarded = ['id'];

    protected $casts = [
        'razor_pay_account' => 'object',
        'razor_pay_account_stake_holder' => 'object',
        'razor_pay_account_product_configuration' => 'object'
    ];

    public function countryRelation(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }
}
