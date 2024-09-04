<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Unit;
use App\Http\Resources\UnitResource;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use Illuminate\Support\Facades\Auth;

class UnitController extends Controller
{
    public function index()
    {

        $query = Unit::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'asc');

        if (request('unit_code')) {
            $query->where('unit_code', 'like', '%' . request('unit_code') . '%');
        }

        if (request('unit_name')) {
            $query->where('unit_name', 'like', '%' . request('unit_name') . '%');
        }

        $units = $query->orderBy($sortField, $sortOrder)->paginate(15)->onEachSide(1);

        return Inertia('Unit/Index', [
            'units' => UnitResource::collection($units),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia('Unit/Create');
    }

    public function store(StoreUnitRequest $request)
    {
        $code = $this->getUnitCode();

        DB::connection('sqlsrv')->beginTransaction();
        $data = new Unit();
        $data->unit_code = $code;
        $data->unit_name = $request->unit_name;
        $data->created_by = Auth::user()->name;

        $success = $data->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route("units.index");
    }

    public function show(Unit $unit)
    {
        $query = $unit::query();

        $sortField = request('sort_field', 'created_at');
        $sortOrder = request('sort_order', 'desc');

        if (request('unit_code')) {
            $query->where('unit_code', 'like', '%' . request('unit_code') . '%');
        }

        $units = $query->orderBy($sortField, $sortOrder)->paginate(10)->onEachSide(1);

        return Inertia('Unit/Show', [
            'unit' => new UnitResource($unit),
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function edit(Unit $unit)
    {
        return Inertia('Unit/Edit', [
            'unit' => new UnitResource($unit)
        ]);
    }

    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        DB::connection('sqlsrv')->beginTransaction();
        $unit->update([
            'unit_name' => $request->unit_name
        ]);

        $success = $unit->save();

        if (!$success) {
            DB::connection('sqlsrv')->rollBack();
        }
        DB::connection('sqlsrv')->commit();

        return to_route("units.index");
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();

        return to_route("units.index");
    }

    public function getUnitCode()
    {
        try {
            $code = 'UNT-' . '0001';
            $maxCode = Unit::withTrashed()->where('unit_code', 'like', 'UNT-' . '%')->max('unit_code');
            if (!$maxCode) {
                $code = 'UNT-' . '0001';
            } else {
                $maxCode = str_replace('UNT-', '', $maxCode);
                $count = $maxCode + 1;
                if ($count < 10) {
                    $code = 'UNT-' . '000' . $count;
                } elseif ($count >= 10 && $count < 100) {
                    $code = 'UNT-' . '00' . $count;
                } elseif ($count >= 100 && $count < 1000) {
                    $code = 'UNT-' . '0' . $count;
                } else {
                    $code = 'UNT-' . $count;
                }
            }
            return $code;
        } catch (\Exception $e) {
            return null;
        }
    }
}