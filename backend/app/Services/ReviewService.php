<?php

namespace App\Services;

use App\Contracts\ReviewRepositoryInterface;
use App\Models\Booking;

class ReviewService
{
    public function __construct(
        protected ReviewRepositoryInterface $reviewRepo
    ) {
    }

    public function submit(array $data, int $clientId)
    {
        $booking = Booking::findOrFail($data['booking_id']);

        abort_if($booking->client_id !== $clientId, 403, 'This is not your booking.');
        abort_if($booking->status !== 'completed', 422, 'Booking is not completed yet.');
        abort_if($booking->review()->exists(), 422, 'You already reviewed this booking.');

        return $this->reviewRepo->create(array_merge($data, [
            'client_id' => $clientId,
            'craftsman_id' => $booking->craftsman_id,
        ]));
    }
}