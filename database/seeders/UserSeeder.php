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
            $superadmin = User::create([
                'name' => 'superadmin',
                'email' => 'superadmin@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $superadmin->assignRole('superadmin');

            $admin = User::create([
                'name' => 'admin',
                'email' => 'admin@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $admin->assignRole('admin');
    
            $user = User::create([
                'name' => 'user',
                'email' => 'user@mail.com',
                'password' => bcrypt('12345678'),
            ]);
    
            $user->assignRole('user');
            
        } catch (\Throwable $th) {
            return;
        }
    }
}