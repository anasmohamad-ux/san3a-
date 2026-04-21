<?php

namespace App\Repositories;

use App\Contracts\BookingRepositoryInterface;
use App\Models\Booking;

class BookingRepository implements BookingRepositoryInterface
{
    public function create(array $data)
    {
        return Booking::create($data);
    }

    public function updateStatus(int $id, string $status)
    {
        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $status]);
        return $booking->fresh(['client', 'craftsman', 'service']);
    }

    public function forUser(int $userId, string $role)
    {
        $column = $role === 'craftsman' ? 'craftsman_id' : 'client_id';

        return Booking::with(['client', 'craftsman', 'service'])
            ->where($column, $userId)
            ->latest()
            ->paginate(10);
    }
}