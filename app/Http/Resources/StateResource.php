<?php

namespace App\Http\Resources;
use App\Http\Resources\CountryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'country'=> new CountryResource($this->country),
           
            //'created_at'=>(new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
