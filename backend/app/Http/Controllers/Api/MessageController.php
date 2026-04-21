<?php

namespace App\Http\Controllers\Api;

use App\Contracts\MessageRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Services\MessageService;

class MessageController extends Controller
{
    public function __construct(
        protected MessageService $messageService,
        protected MessageRepositoryInterface $messageRepo
    ) {
    }

    // US-19, US-20: Send a message
    public function send(SendMessageRequest $request)
    {
        $message = $this->messageService->send(
            $request->user()->id,
            $request->receiver_id,
            $request->body
        );

        return new MessageResource($message->load('sender'));
    }

    // Get conversation with a specific user
    public function conversation(int $userId)
    {
        $messages = $this->messageRepo->conversation(
            request()->user()->id,
            $userId
        );

        return MessageResource::collection($messages);
    }

    // Get inbox (grouped by sender)
    public function inbox()
    {
        return response()->json(
            $this->messageRepo->inbox(request()->user()->id)
        );
    }
}