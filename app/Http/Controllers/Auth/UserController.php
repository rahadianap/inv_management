<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
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
}
