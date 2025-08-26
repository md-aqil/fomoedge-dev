<?php

namespace App\Enums;

enum MentorProfileStatusEnum: string
{
    case PENDING = 'PENDING';
    case ON_HOLD = 'ON_HOLD';
    case APPROVED = 'APPROVED';
    case REJECTED = 'REJECTED';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::ON_HOLD => 'On Hold',
            self::APPROVED => 'Approved',
            self::REJECTED => 'Rejected',
        };
    }
}
