<?php

namespace App\Enums;

enum AttachmentTypeEnum: string
{
    case DEFAULT = 'DEFAULT';
    case FEATURED = 'FEATURED';
    case LOGO = 'LOGO';
    case PROFILE_PICTURE = 'PROFILE_PICTURE';
    case PAN_CARD = 'PAN_CARD';
}
