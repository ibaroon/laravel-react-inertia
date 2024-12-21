<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Country;
use App\Models\State;
use App\Models\City;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ahmed',
            'email' => 'ahmed@example.com',
            'city_id'=>1,
            'password' =>bcrypt('password'),
            'email_verified_at'=> time()
        ]);

        Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();

        Country::factory()
        ->count(10)
        ->hasStates(10)
        ->create();

        // State::factory()
        // ->count(10)
        // ->hasCities(10)
        // ->create();
    }
}
