<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'craftsman_id',
        'name',
        'description',
        'category',
        'price_min',
        'price_max',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price_min' => 'float',
        'price_max' => 'float',
    ];

    public function craftsman()
    {
        return $this->belongsTo(User::class, 'craftsman_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}