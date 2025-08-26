<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendMentorMenteeMeetInviteNotification extends Notification
{
    use Queueable;

    protected $booking;
    protected $userType;


    /**
     * Create a new notification instance.
     */
    public function __construct($booking, $userType)
    {
        $booking->load('mentorProfile.phoneCountry');
        $this->booking = $booking;
        $this->userType = $userType;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', WhatsAppChannel::class];
    }

    public function toWhatsApp(object $notifiable): array
	{
        if($this->userType == 'mentor')
            return [
                'template' =>'mentor_booking_confirmation_',
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

		return [
			'template' => 'mentee_booking_confirmation',
            'to' => '91' . $this->booking->phone_number,
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
            ->subject($this->booking->course->title . ' Booking Google Invite')
            ->view('mails.mentor-mentee-google-meet-invite', ['booking' => $this->booking, 'user' => $notifiable]);
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
