<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {

        $query = Category::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if (request('category_code')) {
            $query->where('category_code', 'like', '%' . request('category_code') . '%');
        }

        if (request('category_name')) {
            $query->where('category_name', 'like', '%' . request('category_name') . '%');
        }

        $categories = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Category/Index', [
            'categories' => CategoryResource::collection($categories),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia('Category/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $code = $this->getCategoryCode();

        DB::connection('sqlsrv')->beginTransaction();
        $data = new Category();
        $data->category_code = $code;
        $data->category_name = $request->category_name;
        $data->created_by = Auth::user()->name;

        $success = $data->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route("categories.index");
    }

    public function show(Category $category)
    {
        return Inertia('Category/Show', [
            'category' => new CategoryResource($category),
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia('Category/Edit', [
            'category' => new CategoryResource($category)
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $category->update([
            'category_name' => $request->category_name,
            'updated_by' => Auth::user()->name
        ]);

        $success = $category->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route("categories.index");
    }

    public function destroy(Category $category)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $category->delete();
        $category->update([
            'deleted_by' => Auth::user()->name
        ]);

        $success = $category->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route("categories.index");
    }

    public function getCategoryCode()
    {
        try {
            $code = 'CAT-' . '0001';
            $maxCode = Category::withTrashed()->where('category_code', 'like', 'CAT-' . '%')->max('category_code');
            if (!$maxCode) {
                $code = 'CAT-' . '0001';
            } else {
                $maxCode = str_replace('CAT-', '', $maxCode);
                $count = $maxCode + 1;
                if ($count < 10) {
                    $code = 'CAT-' . '000' . $count;
                } elseif ($count >= 10 && $count < 100) {
                    $code = 'CAT-' . '00' . $count;
                } elseif ($count >= 100 && $count < 1000) {
                    $code = 'CAT-' . '0' . $count;
                } else {
                    $code = 'CAT-' . $count;
                }
            }
            return $code;
        } catch (\Exception $e) {
            return null;
        }
    }
}