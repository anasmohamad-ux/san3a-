<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:client,craftsman',
            'specialty' => 'nullable|string|max:100',
            'experience_years' => 'nullable|integer|min:0|max:60',
            'photo' => 'nullable|image|max:2048',
        ];
    }
}