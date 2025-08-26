<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MentorBookingReminderNotification extends Notification
{
    use Queueable;

    public $booking;

    /**
     * Create a new notification instance.
     */
    public function __construct(Booking $booking)
    {
        $booking->load('mentorProfile.phoneCountry');
        $this->booking = $booking;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [WhatsAppChannel::class];
    }

    public function toWhatsApp(object $notifiable): array
	{
		return [
			'template' => 'mentor_booking_reminder',
            'to' => $this->booking->mentorProfile->phoneCountry->phone_code . $this->booking->mentorProfile->phone,
			'components' => [
				"body_1" => [
					"type" => "text",
					"value" => $notifiable->full_name
				],
				"body_2" => [
					"type" => "text",
					"value" => $this->booking->courseTiming->start_date
				],
				"body_3" => [
					"type" => "text",
					"value" => $this->booking->courseTiming->start_time
				],
				"body_4" => [
					"type" => "text",
					"value" => $this->booking->google_meet_response->meetingUri
				],
			]
		];
	}

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
