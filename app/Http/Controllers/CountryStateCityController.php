<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;

use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;

class CountryStateCityController extends Controller
{
    // public function getcountry() {
    //     $country = Project::all();
    //     //$data = compact('country');
       
    //     return response()->json($country);

    // }

    //  public function getstate($country_id) {
    //      $state = Task::where('project_id', '=', $country_id)->orderBY('name', 'asc')->get();
    //     //  $data = compact('state');
    //      return response()->json($state);
    //  }
}
