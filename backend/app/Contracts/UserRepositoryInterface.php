<?php

namespace App\Contracts;

interface UserRepositoryInterface
{
    public function findById(int $id);
    public function update(int $id, array $data);
    public function updatePhoto(int $id, $file);
}