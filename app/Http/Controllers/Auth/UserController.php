<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\RoleResource;
use Illuminate\Support\Facades\Gate;
use DB;

class UserController extends Controller
{
    public function index(User $user)
    {
        $query = User::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if(request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        $users = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        $roles = Role::all();

        return Inertia('User/Create', [
            'roles' => RoleResource::collection($roles),
        ]);
    }
    
    public function store(Request $request)
    {
        try {
            DB::connection('sqlsrv')->beginTransaction();
            $data = new User();
            $data->name = $request->name;
            $data->email = $request->email;
            $data->password = $request->password;

            $success = $data->save();

            if(!$success) {
                DB::connection('sqlsrv')->rollBack();
            }
            DB::connection('sqlsrv')->commit();

            $model_id = User::max('id');

            DB::connection('sqlsrv')->beginTransaction();
            $insert = DB::table('model_has_roles')->insert([
                'role_id' => $request->role,
                'model_type' => 'App\Models\User',
                'model_id' => $model_id
            ]);

            if(!$insert) {
                DB::connection('sqlsrv')->rollBack();
            }
            DB::connection('sqlsrv')->commit();

        } catch(\Throwable $throw) {
            return $throw->getMessage();
        }

        return to_route('suppliers.index')->with('success', 'User was created');
    }
}
