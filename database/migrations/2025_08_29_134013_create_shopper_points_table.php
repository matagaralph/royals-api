<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('shopper_points', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('campaign_id')->constrained()->cascadeOnDelete();
            $table->integer('points')->default(0);
            $table->unique(['user_id', 'campaign_id']);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('shopper_points');
    }
};
