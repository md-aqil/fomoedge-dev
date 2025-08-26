<?php

namespace App\Enums;

enum BookingStatusEnum: string
{
    case PENDING = 'PENDING';
    case PAID = 'PAID';
    case COMPLETED = 'COMPLETED';
    case CANCELLED = 'CANCELLED';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::PAID => 'Paid',
            self::COMPLETED => 'Completed',
            self::CANCELLED => 'Cancelled',
        };
    }
}
