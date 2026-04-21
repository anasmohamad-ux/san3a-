<?php

namespace App\Notifications;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewMessageNotification extends Notification
{
    use Queueable;

    public function __construct(public Message $message)
    {
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'new_message',
            'sender' => $this->message->sender->name,
            'sender_id' => $this->message->sender_id,
            'preview' => substr($this->message->body, 0, 80),
        ];
    }
}