<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Resources\PermissionResource;
use Illuminate\Support\Facades\Gate;

class PermissionController extends Controller
{
    public function index()
    {
        
        $query = Permission::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        $permissions = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Permission/Index', [
            'permissions' => PermissionResource::collection($permissions),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
