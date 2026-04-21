<?php

namespace App\Contracts;

interface ReviewRepositoryInterface
{
    public function create(array $data);
    public function forCraftsman(int $craftsmanId);
}