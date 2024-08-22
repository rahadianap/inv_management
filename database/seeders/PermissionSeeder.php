<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        try {
            Permission::create([
                'name' => 'read role'
            ]);
    
            Permission::create([
                'name' => 'create role'
            ]);

            Permission::create([
                'name' => 'update role'
            ]);

            Permission::create([
                'name' => 'delete role'
            ]);
            
        } catch (\Throwable $th) {
            return;
        }
    }
}
