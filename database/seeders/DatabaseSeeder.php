<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\MenuSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PermissionSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // $this->call([PermissionSeeder::class]);
        // $this->call([RoleSeeder::class]);
        $this->call([UserSeeder::class]);
    }
}
