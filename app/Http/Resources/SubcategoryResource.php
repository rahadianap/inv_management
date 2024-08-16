<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SubcategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "subcategory_code" => $this->subcategory_code,
            "subcategory_name" => $this->subcategory_name,
            "category_id" => $this->category_id,
            "category" => new CategoryResource($this->category),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
