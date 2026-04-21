<?php

namespace App\Http\Controllers\Api;

use App\Contracts\BookingRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService,
        protected BookingRepositoryInterface $bookingRepo
    ) {
    }

    // US-14: Client sends booking request
    public function store(StoreBookingRequest $request)
    {
        $booking = $this->bookingService->request(
            array_merge($request->validated(), ['client_id' => $request->user()->id])
        );

        return new BookingResource($booking);
    }

    // US-15: Craftsman accepts or declines
    public function updateStatus(Request $request, int $id)
    {
        $request->validate(['status' => 'required|in:accepted,declined,completed']);

        $booking = $this->bookingService->respond(
            $id,
            $request->status,
            $request->user()->id
        );

        return new BookingResource($booking);
    }

    // List bookings for logged-in user
    public function index(Request $request)
    {
        $bookings = $this->bookingRepo->forUser(
            $request->user()->id,
            $request->user()->role
        );

        return BookingResource::collection($bookings);
    }
}