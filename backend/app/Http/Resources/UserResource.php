<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'phone' => $this->phone,
            'bio' => $this->bio,
            'city' => $this->city,
            'photo' => $this->photo ? asset('storage/' . $this->photo) : null,
            'availability' => $this->availability,
            'average_rating' => $this->averageRating(),
            'services' => ServiceResource::collection($this->whenLoaded('services')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviewsReceived')),
        ];
    }
}