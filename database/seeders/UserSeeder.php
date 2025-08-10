<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {

    public function run(): void {
        User::create([
            'name' => 'John Owner',
            'email' => 'owner@royals.africa',
            "password" => bcrypt('password'),
            "role" => UserRole::Owner,
        ]);
        User::create([
            'name' => 'John Issuer',
            'email' => 'issuer@royals.africa',
            "password" => bcrypt('password'),
            "role" => UserRole::Issuer,
        ]);
        User::create([
            'name' => 'John Shopper',
            'email' => 'shopper@royals.africa',
            "password" => bcrypt('password'),
            "role" => UserRole::Shopper,
        ]);
        
    }
}
