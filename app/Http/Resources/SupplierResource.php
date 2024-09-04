<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "supplier_code" => $this->supplier_code,
            "supplier_name" => $this->supplier_name,
            "supplier_address" => $this->supplier_address,
            "supplier_phone" => $this->supplier_phone,
            "supplier_account_no" => $this->supplier_account_no,
            "supplier_type" => $this->supplier_type,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d H:i:s'),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}