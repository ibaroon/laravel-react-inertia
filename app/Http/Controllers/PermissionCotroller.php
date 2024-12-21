<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Requests\permissionRequest;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionCotroller extends Controller
{
    public function index()
    {
        //$roles=Role::all();
        $totalRecords=Permission::count();

        $query = Permission::query();

        $sortField= request("sort_field" , 'name'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding

        if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
       

        $permissions=$query->orderBy($sortField,$sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);

        return inertia("Permission/Index",[
            "permissions"=> $permissions,
            'totalRecords'=>$totalRecords,
            'queryParams'=>request()->query()? : null,
            'success' => session('success'),
            'warning' => session('warning'),
        ]);
    }

    public function create()
    {
    
        return inertia("Permission/Create");
       
    }

    public function store(PermissionRequest $request)
     { //$permissions = [
    //     'Projects','Create Project','Edit Project','Delete Project',
    //     'Tasks','Create Task','Edit Task','Delete Task',
    //     'Users','Create User','Edit User','Delete User'
    // ];
    // foreach($permissions as $permission)
    // { Permission::create(['name'=>$permission]);  }
    $data=$request->validated();
    Permission::create(['name'=>$data['name']]);
    return to_route('permissions.index')->with('success','Permission Created Successfully !');
        
       }

       public function edit(Permission $permission)
       {
          
           return inertia('Permission/Edit',["permission"=> $permission ]);
       }

       public function update(PermissionRequest $request, Permission $permission)
       {
           $data=$request->validated();
         
           $permission->update($data);
   
           return to_route('permissions.index')->with('success','Permission Updated Successfully !');
       }

       public function destroy(Permission $permission)
       {
          $name=$permission->name;
          $permission->delete();
          return to_route('permissions.index')
          ->with('warning',"Permission \"$name\" deleted Successfully ! ");
       }

}
