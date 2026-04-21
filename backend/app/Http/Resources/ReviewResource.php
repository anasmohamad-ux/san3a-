<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'body' => $this->body,
            'created_at' => $this->created_at->toDateString(),
            'client' => new UserResource($this->whenLoaded('client')),
        ];
    }
}