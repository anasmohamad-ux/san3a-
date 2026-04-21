<?php

namespace App\Repositories;

use App\Contracts\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function findById(int $id)
    {
        return User::with(['services', 'reviewsReceived.client'])->findOrFail($id);
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user->fresh();
    }

    public function updatePhoto(int $id, $file)
    {
        $user = User::findOrFail($id);
        $path = $file->store('photos', 'public');
        $user->update(['photo' => $path]);
        return $user->fresh();
    }
}