<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->category,
            'price_min' => $this->price_min,
            'price_max' => $this->price_max,
            'is_active' => $this->is_active,
            'craftsman' => new UserResource($this->whenLoaded('craftsman')),
        ];
    }
}