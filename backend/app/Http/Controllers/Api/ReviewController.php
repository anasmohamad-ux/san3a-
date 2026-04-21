<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ReviewRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Services\ReviewService;

class ReviewController extends Controller
{
    public function __construct(
        protected ReviewService $reviewService,
        protected ReviewRepositoryInterface $reviewRepo
    ) {
    }

    // US-16, US-17: Submit rating + review
    public function store(StoreReviewRequest $request)
    {
        $review = $this->reviewService->submit(
            $request->validated(),
            $request->user()->id
        );

        return new ReviewResource($review);
    }

    // US-18: List all reviews for a craftsman
    public function forCraftsman(int $craftsmanId)
    {
        $reviews = $this->reviewRepo->forCraftsman($craftsmanId);

        return ReviewResource::collection($reviews);
    }
}