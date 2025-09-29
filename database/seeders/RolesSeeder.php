<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $roles = ['shopper', 'owner', 'issuer', 'admin'];
        foreach ($roles as $roleName) {
            Role::create([
                'name' => $roleName,
            ]);
        }
    }
}
