<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingSuccessNotification extends Notification
{
    use Queueable;

    protected $booking;
    /**
     * Create a new notification instance.
     */
    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage);
        $mail->subject('Booking Success');

        if ($this->booking && $this->booking->transaction && $this->booking->transaction->invoice && $this->booking->transaction->invoice->invoice_path)
            $mail->attach(storage_path('app/' . env('FILESYSTEM_DISK') . '/' . $this->booking->transaction->invoice->invoice_path));

        $mail->view('mails.booking-success', ['booking' => $this->booking]);
        return $mail;
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
