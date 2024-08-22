<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    public function index()
    {
        if(!Gate::allows('read role')) {
            abort(403);
        }
        $query = Role::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        $roles = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Role/Index', [
            'roles' => RoleResource::collection($roles),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
