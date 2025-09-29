<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {

        $this->call(RolesSeeder::class);

        DB::transaction(function () {

            $user = User::create([
                'name' => 'Ralph Mataga',
                'email' => 'test@someone.com',
                'password' => bcrypt('password'),
            ]);


            $user->assignRole('owner');

            $company = Company::create([
                'name' => 'Acme Corporation',
                'owner_id' => $user->id,
            ]);

            $user->company_id = $company->id;
            $user->save();
        });
    }
}
