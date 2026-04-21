<?php

namespace App\Services;

use App\Contracts\BookingRepositoryInterface;
use App\Models\Booking;
use App\Notifications\BookingRequestNotification;

class BookingService
{
    public function __construct(
        protected BookingRepositoryInterface $bookingRepo
    ) {
    }

    public function request(array $data)
    {
        $booking = $this->bookingRepo->create($data);
        $booking->load(['client', 'craftsman', 'service']);

        // Notify the craftsman
        $booking->craftsman->notify(new BookingRequestNotification($booking));

        return $booking;
    }

    public function respond(int $bookingId, string $status, int $craftsmanId)
    {
        $booking = Booking::findOrFail($bookingId);
        abort_if($booking->craftsman_id !== $craftsmanId, 403, 'Unauthorized.');

        return $this->bookingRepo->updateStatus($bookingId, $status);
    }
}