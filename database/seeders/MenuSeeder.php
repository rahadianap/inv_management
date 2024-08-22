<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        Menu::create([
            'name' => 'Konfigurasi',
            'url' => null,
            'icon' => 'ti-settings',
            'main_menu' => null,
            'sort' => 0
        ]);
        Menu::create([
            'name' => 'Roles',
            'url' => 'roles',
            'icon' => '',
            'main_menu' => null,
            'sort' => 0
        ]);
        Menu::create([
            'name' => 'Permissions',
            'url' => 'permissions',
            'icon' => '',
            'main_menu' => null,
            'sort' => 0
        ]);
    }
}
