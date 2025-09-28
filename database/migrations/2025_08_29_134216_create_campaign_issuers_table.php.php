<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('campaign_issuer', function (Blueprint $table) {
            $table->foreignUlid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('campaign_id')->constrained()->cascadeOnDelete();
            $table->primary(['user_id', 'campaign_id']);
            $table->timestamps();
        });
    }


    public function down(): void {
        Schema::dropIfExists('campaign_issuer');
    }
};
