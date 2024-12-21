<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CountryStateCity;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route:: get('/getcountry',[CountryStateCity::class,'getcountry']);
Route:: get('/getstate/{country} ',[CountryStateCity::class,'getstate']);
Route:: get('/getcity/{state} ',[CountryStateCity::class,'getcity']);


