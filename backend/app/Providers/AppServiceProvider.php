<?php

namespace App\Providers;

use App\Contracts\AuthRepositoryInterface;
use App\Contracts\BookingRepositoryInterface;
use App\Contracts\MessageRepositoryInterface;
use App\Contracts\ReviewRepositoryInterface;
use App\Contracts\ServiceRepositoryInterface;
use App\Contracts\UserRepositoryInterface;
use App\Repositories\AuthRepository;
use App\Repositories\BookingRepository;
use App\Repositories\MessageRepository;
use App\Repositories\ReviewRepository;
use App\Repositories\ServiceRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, ServiceRepository::class);
        $this->app->bind(BookingRepositoryInterface::class, BookingRepository::class);
        $this->app->bind(ReviewRepositoryInterface::class, ReviewRepository::class);
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
    }

    public function boot(): void
    {
        if (app()->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }
}