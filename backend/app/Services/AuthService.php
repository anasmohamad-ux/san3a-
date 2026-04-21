<?php

namespace App\Services;

use App\Contracts\AuthRepositoryInterface;

class AuthService
{
    public function __construct(
        protected AuthRepositoryInterface $authRepo
    ) {
    }

    public function register(array $data): array
    {
        return $this->authRepo->register($data);
    }

    public function login(array $credentials): array
    {
        return $this->authRepo->login($credentials);
    }

    public function logout($user): void
    {
        $this->authRepo->logout($user);
    }
}