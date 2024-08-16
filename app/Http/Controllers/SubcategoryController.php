<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\Category;
use App\Http\Resources\SubcategoryResource;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\StoreSubcategoryRequest;
use App\Http\Requests\UpdateSubcategoryRequest;
use DB;

class SubcategoryController extends Controller
{
    public function index()
    {
        $query = Subcategory::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if(request('subcategory_code')) {
            $query->where('subcategory_code', 'like', '%'.request('subcategory_code').'%');
        }

        if(request('subcategory_name')) {
            $query->where('subcategory_name', 'like', '%'.request('subcategory_name').'%');
        }

        if(request('category_id')) {
            $query->where('category_id', 'like', '%'.request('category_id').'%');
        }

        $subcategories = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Subcategory/Index', [
            'subcategories' => SubcategoryResource::collection($subcategories),
            'queryParams' => request()->query() ?: null
        ]);
    }
   
    public function create()
    {
        $categories = Category::all();

        return Inertia('Subcategory/Create', [
            'categories' => CategoryResource::collection($categories)
        ]);
    }
    
    public function store(StoreSubcategoryRequest $request)
    {   
        $code = $this->getSubcategoryCode();

        DB::connection('sqlsrv')->beginTransaction();
        $data = new Subcategory();
        $data->subcategory_code = $code;
        $data->subcategory_name = $request->subcategory_name;
        $data->category_id = $request->category_code;

        $success = $data->save();

        if(!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('subcategories.index')->with('success', 'Subcategory was created');
    }
    
    public function show(Subcategory $subcategory)
    {
        $query = $subcategory->query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if(request('subsubcategory_code')) {
            $query->where('subsubcategory_code', 'like', '%'.request('subsubcategory_code').'%');
        }

        if(request('subsubcategory_name')) {
            $query->where('subsubcategory_name', 'like', '%'.request('subsubcategory_name').'%');
        }

        if(request('subcategory_code')) {
            $query->where('subcategory_code', 'like', '%'.request('subcategory_code').'%');
        }

        $subcategories = Subcategory::where('subcategory_code', $subcategory->subcategory_code)->orderBy($sortField, $sortOrder)->paginate(10)->onEachSide(1);

        return Inertia('Subcategory/Show', [
            'subcategory' => new SubcategoryResource($subcategory),
            'subcategories' => SubcategoryResource::collection($subcategories),
            'queryParams' => request()->query() ?: null
        ]);
    }
    
    public function edit(Subcategory $subcategory)
    {   
        $categories = Category::query()->orderBy('category_name', 'asc')->get();

        return Inertia('Subcategory/Edit', [
            'subcategory' => new SubcategoryResource($subcategory),
            'categories' => CategoryResource::collection($categories),
        ]);
    }
    
    public function update(UpdateSubcategoryRequest $request, Subcategory $subcategory)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $subcategory->update([
            'subcategory_name' => $request->subcategory_name
        ]);

        $success = $subcategory->save();

        if(!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('subcategories.index')->with('success', 'Subcategory was updated');
    }
    
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();

        return to_route('subcategories.index')->with('success', "Subcategory \"$subcategory->subcategory_name\" was deleted");
    }

    public function getSubcategoryCode()
    {
        try {
            $code = 'SUBCAT-'.'0001';
            $maxCode = Subcategory::withTrashed()->where('subcategory_code', 'like', 'SUBCAT-'.'%')->max('subcategory_code');
            if (!$maxCode) { 
                $code = 'SUBCAT-'.'0001'; 
            } else {
                $maxCode = str_replace('SUBCAT-','',$maxCode);
                $count = $maxCode + 1;
                if ($count < 10) { $code = 'SUBCAT-'.'000'.$count; } 
                elseif ($count >= 10 && $count < 100) { $code = 'SUBCAT-'.'00'.$count; } 
                elseif ($count >= 100 && $count < 1000) { $code = 'SUBCAT-'.'0'.$count; } 
                else { $code = 'SUBCAT-'.$count; } 
            }
            return $code;
        } catch(\Exception $e){
            return null;
        }
    }
}
