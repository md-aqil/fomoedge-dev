<?php

namespace App\Traits;

use App\Enums\AttachmentTypeEnum;
use App\Models\Attachment;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait AttachmentTrait
{
    public function attachment(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable');
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachmentable');
    }

    public function featuredImage(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('type', AttachmentTypeEnum::FEATURED->value)->latest();
    }

    public function logoImage(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('type', AttachmentTypeEnum::LOGO->value)->latest();
    }

    public function profilePicture(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('type', AttachmentTypeEnum::PROFILE_PICTURE->value)->latest();
    }

    public function panCard(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachmentable')->where('type', AttachmentTypeEnum::PAN_CARD->value)->latest();
    }
}
