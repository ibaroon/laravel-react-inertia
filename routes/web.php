<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CountryStateCityController;
use App\Http\Controllers\RolesAndPermissionCotroller;
use App\Http\Controllers\PermissionCotroller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');


Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');

    Route::resource('project',ProjectController::class);

    Route::get('/task/myTasks',[TaskController::class,'myTasks'])->name('task.myTasks');
    Route::resource('task',TaskController::class);

    Route::resource('user',UserController::class)->middleware('permission:Users');

    Route::resource('roles',RolesAndPermissionCotroller::class);
    Route::post('/roles/addroleusers',[RolesAndPermissionCotroller::class,'addRoleUsers'])->name('roles.addRoleUsers');
    Route::post('/roles/addrolepermissions',[RolesAndPermissionCotroller::class,'addRolePermissions'])->name('roles.addRolePermissions');
    Route::delete('/roles/destroyPermission/{permission}/{roleId}', [RolesAndPermissionCotroller::class, 'destroyPermission'])->name('roles.destroyPermission');
    Route::delete('/roles/destroyUser/{user}/{roleId}', [RolesAndPermissionCotroller::class, 'destroyUser'])->name('roles.destroyUser');
    Route::get('/roles/edit/{role}',[RolesAndPermissionCotroller::class,'edit'])->name('roles.edits');

    Route::resource('permissions',PermissionCotroller::class);
    //Route::get('/permissions/create',[RolesAndPermissionCotroller::class,'createPermissions'])->name('permission.create');
    //Route::post('/permissions/store',[RolesAndPermissionCotroller::class,'storePermissions'])->name('permission.store');
    //Route::get('/permissions/edit/{permi}',[RolesAndPermissionCotroller::class,'editPermissions'])->name('permission.edit');
    //Route::post('/permissions/update',[RolesAndPermissionCotroller::class,'updatePermissions'])->name('permission.update');
    //Route::delete('/permissions/destroy/{permi}', [RolesAndPermissionCotroller::class, 'destroyPermissions'])->name('permission.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
//require __DIR__.'/admin-auth.php';