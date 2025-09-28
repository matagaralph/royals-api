<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::table('companies', function (Blueprint $table) {
            $table->foreignUlid('owner_id')
                ->constrained('users')
                ->cascadeOnDelete();
        });
    }
    
    public function down(): void {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropForeign('owner_id');
            $table->dropColumn('owner_id');
        });
    }
};
