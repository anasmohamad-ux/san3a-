<?php

namespace App\Services;

use App\Contracts\MessageRepositoryInterface;

class MessageService
{
    public function __construct(
        protected MessageRepositoryInterface $messageRepo
    ) {
    }

    public function send(int $senderId, int $receiverId, string $body)
    {
        return $this->messageRepo->send([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'body' => $body,
        ]);
    }
}