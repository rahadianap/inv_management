<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        try {
            $superadmin = Role::create([
                'name' => 'superadmin',
                'guard_name' => 'web'
            ]);

            $superadmin->givePermissionTo('read');
            $superadmin->givePermissionTo('create');
            $superadmin->givePermissionTo('update');
            $superadmin->givePermissionTo('delete');
    
            $admin = Role::create([
                'name' => 'admin',
                'guard_name' => 'web'
            ]);

            $admin->givePermissionTo('read');
            $admin->givePermissionTo('create');
            $admin->givePermissionTo('update');

            $user = Role::create([
                'name' => 'user',
                'guard_name' => 'web'
            ]);

            $user->givePermissionTo('read');
            $user->givePermissionTo('create');
            
        } catch (\Throwable $th) {
            return;
        }
    }
}
