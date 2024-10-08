<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "product_name" => ['required', 'max:255'],
            "subcategory_id" => ['required'],
            "available_status" => ['required'],
            "product_description" => ['required', 'max:255'],
            "product_price" => ['required'],
            "product_photos" => ['required'],
            "is_taxable" => ['required'],
            "barcode" => ['required', 'max:255'],
            "max_stock" => ['required'],
            "max_count" => ['required'],
            "is_sold_by_weight" => ['required'],
            "selling_time_id" => ['required'],
            "supplier_id" => ['required'],
        ];
    }
}
