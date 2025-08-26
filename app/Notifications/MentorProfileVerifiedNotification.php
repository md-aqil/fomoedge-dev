<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MentorProfileVerifiedNotification extends Notification
{
	use Queueable;

	/**
	 * Create a new notification instance.
	 */
	public function __construct()
	{
		//
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
			'template' => 'mentor_profile_initial_verification_message',
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
