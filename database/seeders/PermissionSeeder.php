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
                'name' => 'read'
            ]);
    
            Permission::create([
                'name' => 'create'
            ]);

            Permission::create([
                'name' => 'update'
            ]);

            Permission::create([
                'name' => 'delete'
            ]);
            
        } catch (\Throwable $th) {
            return;
        }
    }
}
