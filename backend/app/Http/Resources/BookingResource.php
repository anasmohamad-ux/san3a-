<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'preferred_date' => $this->preferred_date,
            'description' => $this->description,
            'status' => $this->status,
            'client' => new UserResource($this->whenLoaded('client')),
            'craftsman' => new UserResource($this->whenLoaded('craftsman')),
            'service' => new ServiceResource($this->whenLoaded('service')),
            'created_at' => $this->created_at,
        ];
    }
}