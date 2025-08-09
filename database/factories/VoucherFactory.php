<?php

namespace Database\Factories;

use App\Models\Voucher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class VoucherFactory extends Factory {
    protected $model = Voucher::class;

    public function definition(): array {
        return [
            'campaign_id' => $this->faker->randomNumber(),
            'points_value' => $this->faker->randomNumber(),
            'code' => $this->faker->word(),
            'reference' => $this->faker->word(),
            'scanned_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
