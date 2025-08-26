<?php

namespace App\Observers;

use App\Enums\MentorProfileStatusEnum;
use App\Models\MentorProfile;
use App\Notifications\MentorProfileUpdateStatusNotification;
use App\Notifications\MentorWelcomeNotification;

class MentorProfileObserver
{
    /**
     * Handle the MentorProfile "created" event.
     */
    public function created(MentorProfile $mentorProfile): void
    {
        $mentorProfile->user->notify(new MentorWelcomeNotification());
    }

    /**
     * Handle the MentorProfile "updated" event.
     */
    public function updated(MentorProfile $mentorProfile): void
    {
        if ($mentorProfile->status == MentorProfileStatusEnum::APPROVED->value) {
            $mentorProfile->kycDetail()->update(['activated_at' => now()]);
            $mentorProfile->user->notify(new MentorProfileUpdateStatusNotification('mails.mentor-profile-approve-status'));
        }

        if ($mentorProfile->status == MentorProfileStatusEnum::ON_HOLD->value) {
            $mentorProfile->user->notify(new MentorProfileUpdateStatusNotification('mails.mentor-profile-on-hold-status'));
        }

        if ($mentorProfile->status == MentorProfileStatusEnum::REJECTED->value) {
            $mentorProfile->user->notify(new MentorProfileUpdateStatusNotification('mails.mentor-profile-reject-status'));
        }
    }

    /**
     * Handle the MentorProfile "deleted" event.
     */
    public function deleted(MentorProfile $mentorProfile): void
    {
        //
    }

    /**
     * Handle the MentorProfile "restored" event.
     */
    public function restored(MentorProfile $mentorProfile): void
    {
        //
    }

    /**
     * Handle the MentorProfile "force deleted" event.
     */
    public function forceDeleted(MentorProfile $mentorProfile): void
    {
        //
    }
}
