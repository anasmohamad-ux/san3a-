<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingRequestNotification extends Notification
{
    use Queueable;

    public function __construct(public Booking $booking)
    {
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'booking_request',
            'booking_id' => $this->booking->id,
            'client' => $this->booking->client->name,
            'service' => $this->booking->service->name,
            'date' => $this->booking->preferred_date,
        ];
    }
}