<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Subcategory;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'category_code';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'category_code',
        'category_name'
    ];

    public function subcategories(): HasMany
    {
        return $this->hasMany(Subcategory::class);
    }

}
