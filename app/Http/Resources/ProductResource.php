<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\SubcategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "product_code" => $this->product_code,
            "product_name" => $this->product_name,
            "subcategory_id" => $this->subcategory_id,
            "subcategory" => new SubcategoryResource($this->subcategory),
            "available_status" => $this->available_status,
            "product_description" => $this->product_description,
            "product_price" => $this->product_price,
            "product_photos" => $this->product_photos,
            "special_type" => $this->special_type,
            "is_taxable" => $this->is_taxable,
            "barcode" => $this->barcode,
            "max_stock" => $this->max_stock,
            "max_count" => $this->max_count,
            "product_weight" => $this->product_weight,
            "is_sold_by_weight" => $this->is_sold_by_weight,
            "selling_time_id" => $this->subcategory_id,
            "supplier_id" => $this->supplier_id,
            "supplier" => new SupplierResource($this->supplier),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
