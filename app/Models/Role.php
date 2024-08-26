<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use App\Models\Permission;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'id';

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'guard_name'
    ];

    public function permissions(): belongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_has_permissions', 'role_id', 'permission_id');
    }
}
