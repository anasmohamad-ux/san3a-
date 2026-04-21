<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service_id' => 'required|exists:services,id',
            'craftsman_id' => 'required|exists:users,id',
            'preferred_date' => 'required|date|after:today',
            'description' => 'nullable|string|max:1000',
        ];
    }
}