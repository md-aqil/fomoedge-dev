<?php

namespace App\Enums;

enum CourseTypeEnum: string
{
    case VIDEO_CALL = 'VIDEO_CALL';
    case BUNDLE = 'BUNDLE';
    case EVENT = 'EVENT';

    public function label(): string
    {
        return match ($this) {
            self::VIDEO_CALL => 'Video Call',
            self::BUNDLE => 'Bundle',
            self::EVENT => 'Event',
        };
    }
}
