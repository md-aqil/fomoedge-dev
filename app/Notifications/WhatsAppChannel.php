<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;

class WhatsAppChannel
{
	/**
	 * Send the given notification.
	 */
	public function send(object $notifiable, $notification): void
	{
		$message = $notification->toWhatsApp($notifiable);
		
		$data = [
			"integrated_number" => env('MSG91_WHATSAPP_NO'),
			"content_type" => "template",
			"payload" => [
				"messaging_product" => "whatsapp",
				"type" => "template",
				"template" => [
					"name" => $message['template'],
					"language" => [
						"code" => "en",
						"policy" => "deterministic"
					],
					"namespace" => null,
					"to_and_components" => [
						[
							'to' => $message['to'],
							"components" => $message['components']
						]
					]
				]
			]
		];

		$response = Http::withHeaders([
			'Content-Type' => 'application/json',
			'authkey' => env('MSG91_AUTH_KEY')
		])->post(env('MSG91_WHATSAPP_URL'), $data);


		if ($response->failed()) {
			// Handle the error response if needed
			\Log::error('WhatsApp notification failed', [
				'response' => $response->body(),
				'notifiable' => $notifiable,
				'notification' => $notification,
				'data' => $data
			]);
		}
	}
}
