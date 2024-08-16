<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Subcategory;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\SubcategoryResource;

class ProductController extends Controller
{
    public function index()
    {
        $query = Product::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if(request('product_code')) {
            $query->where('product_code', 'like', '%'.request('product_code').'%');
        }

        if(request('product_name')) {
            $query->where('product_name', 'like', '%'.request('product_name').'%');
        }

        if(request('available_status')) {
            $query->where('available_status', request('available_status'));
        }

        $products = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Product/Index', [
            'products' => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
    
    public function create()
    {
        $subcategories = Subcategory::all();
        $suppliers = Supplier::all();

        return Inertia('Product/Create', [
            'subcategories' => SubcategoryResource::collection($subcategories),
            'suppliers' => SupplierResource::collection($suppliers)
        ]);
    }
    
    public function store(StoreProductRequest $request)
    {   
        $code = $this->getProductCode();

        DB::connection('sqlsrv')->beginTransaction();
        $data = new Product();
        $data->product_code = $code;
        $data->product_name = $request->product_name;
        $data->subcategory_id = $request->subcategory_id;
        $data->available_status = $request->available_status;
        $data->product_description = $request->product_description;
        $data->product_price = $request->product_price;
        $data->product_photos = "https://lioness-trusting-completely.ngrok-free.app/storage/images/" . $request->product_name . ".jpg";
        $data->barcode = $request->barcode;
        $data->max_stock = $request->max_stock;
        $data->max_count = $request->max_count;
        $data->selling_time_id = $request->selling_time_id;
        $data->supplier_id = $request->supplier_id;
        $data->is_taxable = $request->is_taxable;
        $data->is_sold_by_weight = $request->is_sold_by_weight;
        $data->product_weight = '{"unit": "per pack", "count": 1, "value": 1}';
        $data->special_type = null;

        $success = $data->save();

        if(!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('products.index')->with('success', 'Product was created');
    }
    
    public function show(Product $product)
    {
        $query = $product->query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if(request('product_code')) {
            $query->where('product_code', 'like', '%'.request('product_code').'%');
        }

        if(request('product_name')) {
            $query->where('product_name', 'like', '%'.request('product_name').'%');
        }

        return Inertia('Product/Show', [
            'product' => new ProductResource($product),
            'queryParams' => request()->query() ?: null
        ]);
    }
    
    public function edit(Product $product)
    {
        $subcategories = Subcategory::query()->orderBy('subcategory_name', 'asc')->get();
        $suppliers = Supplier::query()->orderBy('supplier_name', 'asc')->get();

        return Inertia('Product/Edit', [
            'product' => new ProductResource($product),
            'subcategories' => SubcategoryResource::collection($subcategories),
            'suppliers' => SupplierResource::collection($suppliers),
        ]);
    }
    
    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $product->update([
            'product_name' => $request->product_name,
            'subcategory_id' => $request->subcategory_id,
            'available_status' => $request->available_status,
            'product_description' => $request->product_description,
            'product_price' => $request->product_price,
            'product_photos' => $request->product_photos,
            'barcode' => $request->barcode,
            'max_stock' => $request->max_stock,
            'max_count' => $request->max_count,
            'supplier_id' => $request->supplier_id,
            'is_taxable' => $request->is_taxable,
            'is_sold_by_weight' => $request->is_sold_by_weight,
            'selling_time_id' => 'IDSLT202405230901596724',
            'product_weight' => '{"unit": "per pack", "count": 1, "value": 1}',
            'special_type' => null

        ]);

        $success = $product->save();

        if(!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('products.index')->with('success', 'Product was updated');
    }
    
    public function destroy(Product $product)
    {
        $product->delete();

        return to_route('products.index')->with('success', "Product \"$product->product_name\" was deleted");
    }

    public function getProductCode()
    {
        try {
            $code = 'PRD-'.'000001';
            $maxCode = Product::withTrashed()->where('product_code', 'like', 'PRD-'.'%')->max('product_code');
            if (!$maxCode) { 
                $code = 'PRD-'.'000001'; 
            } else {
                $maxCode = str_replace('PRD-','',$maxCode);
                $count = $maxCode + 1;
                if ($count < 10) { $code = 'PRD-'.'00000'.$count; } 
                elseif ($count >= 10 && $count < 100) { $code = 'PRD-'.'0000'.$count; } 
                elseif ($count >= 100 && $count < 1000) { $code = 'PRD-'.'000'.$count; } 
                elseif ($count >= 1000 && $count < 10000) { $code = 'PRD-'.'00'.$count; } 
                elseif ($count >= 10000 && $count < 100000) { $code = 'PRD-'.'0'.$count; } 
                else { $code = 'PRD-'.$count; } 
            }
            return $code;
        } catch(\Exception $e){
            return null;
        }
    }
}
