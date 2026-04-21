<?php

namespace App\Contracts;

interface MessageRepositoryInterface
{
    public function send(array $data);
    public function conversation(int $userId, int $otherId);
    public function inbox(int $userId);
}