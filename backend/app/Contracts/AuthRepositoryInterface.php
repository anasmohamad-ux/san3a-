<?php

namespace App\Contracts;

interface AuthRepositoryInterface
{
    public function register(array $data): array;
    public function login(array $credentials): array;
    public function logout($user): void;
}