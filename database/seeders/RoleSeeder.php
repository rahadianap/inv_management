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

            $superadmin->givePermissionTo('read role');
            $superadmin->givePermissionTo('create role');
            $superadmin->givePermissionTo('update role');
            $superadmin->givePermissionTo('delete role');
    
            $admin = Role::create([
                'name' => 'admin',
                'guard_name' => 'web'
            ]);

            $admin->givePermissionTo('read role');
            $admin->givePermissionTo('create role');

            $user = Role::create([
                'name' => 'user',
                'guard_name' => 'web'
            ]);

            $user->givePermissionTo('read role');
            
        } catch (\Throwable $th) {
            return;
        }
    }
}
