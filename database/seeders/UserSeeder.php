<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        try {
            $user1 = User::create([
                'name' => 'superadmin',
                'email' => 'superadmin@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $user1->assignRole('superadmin');

            $user2 = User::create([
                'name' => 'budijaya',
                'email' => 'budijaya@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $user2->assignRole('admin');
    
            $user3 = User::create([
                'name' => 'aliala',
                'email' => 'aliala@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $user3->assignRole('user');
            
        } catch (\Throwable $th) {
            return;
        }
    }
}