<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings');
            $table->foreignId('client_id')->constrained('users');
            $table->foreignId('craftsman_id')->constrained('users');
            $table->tinyInteger('rating');
            $table->string('body', 500)->nullable();
            $table->timestamps();
            $table->index(['craftsman_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};