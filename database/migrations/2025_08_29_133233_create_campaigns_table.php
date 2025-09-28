<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('company_id')->constrained('companies')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('min_points_per_voucher')->default(1);
            $table->decimal('min_spend_for_point', 8, 2);
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('campaigns');
    }
};
