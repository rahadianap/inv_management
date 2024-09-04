<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Resources\SupplierResource;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use DB;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{
    public function index()
    {
        $query = Supplier::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if (request('supplier_code')) {
            $query->where('supplier_code', 'like', '%' . request('supplier_code') . '%');
        }

        if (request('supplier_name')) {
            $query->where('supplier_name', 'like', '%' . request('supplier_name') . '%');
        }

        $suppliers = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Supplier/Index', [
            'suppliers' => SupplierResource::collection($suppliers),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia('Supplier/Create');
    }

    public function store(StoreSupplierRequest $request)
    {
        $code = $this->getSupplierCode();

        DB::connection('sqlsrv')->beginTransaction();
        $data = new Supplier();
        $data->supplier_code = $code;
        $data->supplier_name = $request->supplier_name;
        $data->supplier_address = $request->supplier_address;
        $data->supplier_phone = $request->supplier_phone;
        $data->supplier_account_no = $request->supplier_account_no;
        $data->supplier_type = $request->supplier_type;
        $data->created_by = Auth::user()->name;
        $data->updated_by = Auth::user()->name;

        $success = $data->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('suppliers.index');
    }

    public function show(Supplier $supplier)
    {
        $query = $supplier::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if (request('supplier_code')) {
            $query->where('supplier_code', 'like', '%' . request('supplier_code') . '%');
        }

        if (request('supplier_name')) {
            $query->where('supplier_name', 'like', '%' . request('supplier_name') . '%');
        }

        return Inertia('Supplier/Show', [
            'supplier' => new SupplierResource($supplier),
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia('Supplier/Edit', [
            'supplier' => new SupplierResource($supplier)
        ]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $supplier->update([
            'supplier_name' => $request->supplier_name,
            'supplier_address' => $request->supplier_address,
            'supplier_phone' => $request->supplier_phone,
            'supplier_account_no' => $request->supplier_account_no,
            'supplier_type' => $request->supplier_type,
        ]);

        $success = $supplier->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route('suppliers.index');
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return to_route('suppliers.index')->with('success', "Supplier \"$supplier->supplier_name\" was deleted");
    }

    public function getSupplierCode()
    {
        try {
            $code = 'SUP-' . '0001';
            $maxCode = Supplier::withTrashed()->where('supplier_code', 'like', 'SUP-' . '%')->max('supplier_code');
            if (!$maxCode) {
                $code = 'SUP-' . '0001';
            } else {
                $maxCode = str_replace('SUP-', '', $maxCode);
                $count = $maxCode + 1;
                if ($count < 10) {
                    $code = 'SUP-' . '000' . $count;
                } elseif ($count >= 10 && $count < 100) {
                    $code = 'SUP-' . '00' . $count;
                } elseif ($count >= 100 && $count < 1000) {
                    $code = 'SUP-' . '0' . $count;
                } else {
                    $code = 'SUP-' . $count;
                }
            }
            return $code;
        } catch (\Exception $e) {
            return null;
        }
    }
}