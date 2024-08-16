<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;

class Subcategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'subcategory_code';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'subcategory_code',
        'subcategory_name',
        'category_code'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
