<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use App\Models\Role;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'id';

    protected $table = 'permissions';

    protected $fillable = [
        'name',
        'guard_name'
    ];

    public function roles(): belongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_has_permissions', 'permission_id', 'role_id');
    }
}
