<?php

namespace Database\Factories;

use App\Models\ShopperPoint;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ShopperPointFactory extends Factory {
    protected $model = ShopperPoint::class;

    public function definition(): array {
        return [
            'user_id' => $this->faker->randomNumber(),
            'campaign_id' => $this->faker->randomNumber(),
            'points' => $this->faker->randomNumber(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
