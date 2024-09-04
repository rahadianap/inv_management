<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "supplier_name" => ['required', 'max:255'],
            "supplier_address" => ['max:255'],
            "supplier_phone" => ['max:255'],
            "supplier_type" => ['max:255'],
        ];
    }
}
