<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'supplier_code';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'supplier_code',
        'supplier_name',
        'supplier_address',
        'supplier_phone',
        'supplier_account_no',
        'supplier_type'
    ];
}
