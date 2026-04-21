<?php

namespace App\Contracts;

interface BookingRepositoryInterface
{
    public function create(array $data);
    public function updateStatus(int $id, string $status);
    public function forUser(int $userId, string $role);
}