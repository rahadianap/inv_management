<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\PermissionResource;
use DB;

class RoleController extends Controller
{
    public function index(Role $role)
    {
        
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

    public function create()
    {
        $permissions = Permission::all();

        return Inertia('Role/Create', [
            'permissions' => PermissionResource::collection($permissions),
        ]);
    }
    
    public function store(Request $request)
    {
        try {
            DB::connection('sqlsrv')->beginTransaction();
            $data = new Role();
            $data->name = $request->name;
            $data->guard_name = 'web';

            $success = $data->save();

            if(!$success) {
                DB::connection('sqlsrv')->rollBack();
            }
            DB::connection('sqlsrv')->commit();

            $permissions = Role::max('id');

            DB::connection('sqlsrv')->beginTransaction();
            foreach($request->roles as $role) {
                $insert = DB::table('role_has_permissions')->insert([
                    'permission_id' => $role,
                    'role_id' => $permissions
                ]);

                if(!$insert) {
                    DB::connection('sqlsrv')->rollBack();
                }
                DB::connection('sqlsrv')->commit();
            }

        } catch(\Throwable $throw) {
            return $throw->getMessage();
        }

        return to_route('suppliers.index')->with('success', 'Role was created');
    }

    public function show(Role $role)
    {
        $query = Role::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if(request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        $permissions = DB::table('role_has_permissions')->leftJoin('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')->where('role_id', $role->id)->get();

        return Inertia('Role/Show', [
            'role' => new RoleResource($role),
            'permissions' => $permissions,
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function edit(Role $role)
    {   
        $permissions = Permission::all();

        return Inertia('Role/Edit', [
            'role' => new RoleResource($role),
            'permissions' => $permissions,
        ]);
    }
    
    public function update(UpdateSubcategoryRequest $request, Role $role)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $role->update([
            'name' => $request->name
        ]);

        $success = $role->save();

        if(!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('roles.index')->with('success', 'Role was updated');
    }
}
