<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// ── Public ────────────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/password/email', [PasswordResetController::class, 'sendLink']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/craftsmen/{id}/reviews', [ReviewController::class, 'forCraftsman']);

// ── Authenticated ─────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile (US-06, US-07)
    Route::put('/profile', [UserController::class, 'update']);
    Route::post('/profile/photo', [UserController::class, 'updatePhoto']);

    // Bookings (US-14)
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);

    // Messaging (US-19, US-20)
    Route::post('/messages', [MessageController::class, 'send']);
    Route::get('/messages/{userId}', [MessageController::class, 'conversation']);
    Route::get('/inbox', [MessageController::class, 'inbox']);

    // Notifications (US-21)
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    // Reviews (US-16, US-17)
    Route::post('/reviews', [ReviewController::class, 'store']);

    // ── Craftsman only ────────────────────────────────────────
    Route::middleware('role:craftsman')->group(function () {
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
        Route::put('/availability', [UserController::class, 'setAvailability']);
        Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    });
});