<?php

namespace App\Http\Resources;
use Carbon\Carbon;
use App\Http\Resources\CityResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserCrudResource extends JsonResource
{
    public static $wrap=false; // to use resource in show project
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
            'email'=>$this->email,
            'roless'=>$this->roless,
            'city'=> new CityResource($this->city),
            'created_at'=>(new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}