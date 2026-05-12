<?php

namespace App\Repositories;

use App\Contracts\AuthRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthRepository implements AuthRepositoryInterface
{
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            'specialty' => $data['specialty'] ?? null,
            'experience_years' => $data['experience_years'] ?? null,
        ]);

        // handle photo upload if provided
        if (!empty($data['photo'])) {
            $path = $data['photo']->store('photos', 'public');
            $user->update(['photo' => $path]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return ['user' => $user->fresh(), 'token' => $token];
    }

    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }

    public function logout($user): void
    {
        $user->currentAccessToken()->delete();
    }
}