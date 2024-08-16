<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'product_code';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'product_code',
        'product_name',
        'subcategory_id',
        'available_status',
        'product_description',
        'product_price',
        'product_photos',
        'special_type',
        'is_taxable',
        'barcode',
        'max_stock',
        'max_count',
        'product_weight',
        'is_sold_by_weight',
        'selling_time_id',
        'supplier_id'
    ];
}
