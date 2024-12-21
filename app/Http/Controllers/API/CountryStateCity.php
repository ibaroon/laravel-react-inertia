<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\State;
use App\Models\City;

use Illuminate\Support\Facades\DB;

class CountryStateCity extends Controller
{
    public function getcountry() {
        $country = Country::all();
        //$data = compact('country');
       
        return response()->json($country);

    }

      public function getstate($country_id) {
          $state = State::where('country_id', '=', $country_id)->orderBY('name', 'asc')->get();
         //  $data = compact('state');
          return response()->json($state);
      }

      public function getcity($state_id) {
        $city = City::where('state_id', '=', $state_id)->orderBY('name', 'asc')->get();
       //  $data = compact('city');
        return response()->json($city);
    }

}
