<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "unit_code" => $this->unit_code,
            "unit_name" => $this->unit_name,
            "created_at" => (new Carbon($this->created_at))->format("Y-m-d H:i:s"),
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
        ];
    }
}