<?php

namespace App\Repositories;

use App\Contracts\MessageRepositoryInterface;
use App\Models\Message;

class MessageRepository implements MessageRepositoryInterface
{
    public function send(array $data)
    {
        return Message::create($data);
    }

    public function conversation(int $userId, int $otherId)
    {
        return Message::where(function ($q) use ($userId, $otherId) {
            $q->where('sender_id', $userId)->where('receiver_id', $otherId);
        })->orWhere(function ($q) use ($userId, $otherId) {
            $q->where('sender_id', $otherId)->where('receiver_id', $userId);
        })->with('sender')->orderBy('created_at')->get();
    }

    public function inbox(int $userId)
    {
        return Message::where('receiver_id', $userId)
            ->with('sender')
            ->latest()
            ->get()
            ->groupBy('sender_id');
    }
}