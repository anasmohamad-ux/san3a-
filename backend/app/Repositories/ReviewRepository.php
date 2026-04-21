<?php

namespace App\Repositories;

use App\Contracts\ReviewRepositoryInterface;
use App\Models\Review;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function create(array $data)
    {
        return Review::create($data);
    }

    public function forCraftsman(int $craftsmanId)
    {
        return Review::with('client')
            ->where('craftsman_id', $craftsmanId)
            ->latest()
            ->paginate(10);
    }
}