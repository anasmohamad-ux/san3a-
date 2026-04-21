<?php

namespace App\Contracts;

interface ServiceRepositoryInterface
{
    public function all(array $filters = []);
    public function create(int $craftsmanId, array $data);
    public function update(int $id, array $data);
    public function delete(int $id): void;
}