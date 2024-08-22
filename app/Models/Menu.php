<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function subMenu(): HasMany
    {
        return $this->hasMany(Menu::class, 'main_menu');
    }
}
