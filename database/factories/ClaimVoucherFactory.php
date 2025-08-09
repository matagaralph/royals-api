<?php

namespace Database\Factories;

use App\Models\ClaimVoucher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ClaimVoucherFactory extends Factory {
    protected $model = ClaimVoucher::class;

    public function definition(): array {
        return [
            'user_id' => $this->faker->randomNumber(),
            'reward_id' => $this->faker->randomNumber(),
            'code' => $this->faker->word(),
            'status' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
