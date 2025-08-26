<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MentorProfileUpdateStatusNotification extends Notification
{
    use Queueable;

    protected $viewFile;

    /**
     * Create a new notification instance.
     */
    public function __construct($viewFile)
    {
        $this->viewFile = $viewFile;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if($this->viewFile == 'mails.mentor-profile-approve-status')
            return ['mail', WhatsAppChannel::class];

        return ['mail'];
    }

    public function toWhatsApp(object $notifiable): array
	{
		return [
			'template' => 'mentor_profile_activation_',
            'to' => $notifiable->mentorProfile->phoneCountry->phone_code . $notifiable->mentorProfile->phone,
			'components' => [
				"body_1" => [
					"type" => "text",
					"value" => $notifiable->full_name
				],
				"button_1" => [
					"subtype" => "url",
					"type" => "text",
					"value" => "https://fomoedge.com/login"
				]
			]
		];
	}

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Mentor Profile Update Status')
            ->view($this->viewFile, [
                'user' => $notifiable
            ]);
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
