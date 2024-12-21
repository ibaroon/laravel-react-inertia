<?php
namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use App\Http\Requests\roleRequest;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use App\Http\Resources\UserResource;


class RolesAndPermissionCotroller extends Controller
{    
   
 
       public function index()  {
        //$roles=Role::all();
        $totalRecords=Role::count();

        $query = Role::query();

        $sortField= request("sort_field" , 'name'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding

        if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
       

        $roles=$query->orderBy($sortField,$sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);

        return inertia("Roles/Index",[
            "roles"=> $roles,
            'totalRecords'=>$totalRecords,
            'queryParams'=>request()->query()? : null,
            'success' => session('success'),
            'warning' => session('warning'),
        ]);
    }

       public function create()
    {
    
        return inertia("Roles/Create",[
             'users'=>User::orderBy('name')->get(),
             'permissions'=>Permission::orderBy('name')->get(),
             'success' => session('success'),
            'warning' => session('warning'),
            // 'projects' => Project::when($request->term, function($query,$term)
            // {$query->where("name","like","%".$term."%");})->paginate()
            ] );
       
    }
       public function store(Request $request)
    {
// dd($request->name);
if($request->name==null)
 {return to_route('roles.create')->with('warning','Add Role Name First!');}
 elseif($request['users']=="" || count($request->users)==0)
 { return to_route('roles.create')->with('warning','Add User First!');}
 elseif($request['permission']=="" || count($request->permission)==0)
 {return to_route('roles.create')->with('warning','Add Permission First!');}

$role=Role::create(['name'=>$request->name]);

  foreach ($request->permission as $perm ) {
       $data['per']=$perm['label'];
       $role->givePermissionTo($perm['label']);
  }

 foreach ($request->users as $usr ) {
  
     $user=User::find($usr['value']);
     $user->assignRole($role->name);
      }


return to_route('roles.index')->with('success','Role Created Successfully !');
       }


       public function show(Role $role)
       {//dd($role->id);
        $RolePermissions=$role->permissions;  // get collection
        $role->permissions->pluck('name'); // return only the permission names:
        $RoleUsers=$role->users; // get users
       // dd(UserResource::collection($users));
       $AllPermission=Permission::all();
       $AvaPermission= $AllPermission->diff($RolePermissions); 

       $AllUsers=User::all();
       $AvaUsers= $AllUsers->diff($RoleUsers);

       return inertia("Roles/Show",[
         "role"=> $role,
         "RoleUsers"=>$RoleUsers,
         "RolePermissions"=>$RolePermissions,
         "AvaUsers"=>$AvaUsers,
         "AvaPermissions"=>$AvaPermission,
         'success' => session('success'),
            'warning' => session('warning'),
    ]);
       }

       public function destroy(Role $role)
       {
          $name=$role->name;
          $role->delete();
          return to_route('roles.index')
          ->with('warning',"Role \"$name\" deleted Successfully ! ");
       }

public function addRoleUsers(Request $request) {
    //dd($request->users);
    $role_id=$request->role_id;
    $role=Role::find($role_id);

    if($request['users']=="" || count($request->users)==0)
    { return to_route('roles.show',$role)->with('warning','Add User First!');}
//dd($role);

foreach ($request->users as $usr ) {

 $user=User::find($usr['value']);
 $user->assignRole($role->name);
  }

  return to_route('roles.show',$role)->with('success','User Added to the role Successfully !');
       }

public function addRolePermissions(Request $request){
    $role_id=$request->role_id;
    $role=Role::find($role_id);

    if($request['permission']=="" || count($request->permission)==0)
    {return to_route('roles.show',$role)->with('warning','Add Permission First!');}

        // dd($role);

       foreach ($request->permission as $perm ) {
         $data['per']=$perm['label'];
         $role->givePermissionTo($perm['label']);
      }  
   return to_route('roles.show',$role)->with('success','Permission Added to the role Successfully !');
       }

public function destroyUser(User $user,string $roleId){
//dd($user);
$role=Role::find($roleId);
$user->removeRole($role);
return to_route('roles.show',$role)->with('warning',"User Removed from the role Successfully ! ");
       }

public function destroyPermission(Permission $permission,string $roleId){
//dd($permission->name); 
$role=Role::find($roleId);
$role->revokePermissionTo($permission->name);
return to_route('roles.show',$role)->with('warning',"Permission Removed from the role Successfully ! ");
       }

       public function edit(Role $role)
       {
          
           return inertia('Roles/Edit',["role"=> $role ]);
       }

       public function update(roleRequest $request, Role $role)
       {
           $data=$request->validated();
         
           $role->update($data);
   
           return to_route('roles.index')->with('success','Role Updated Successfully !');
       }
}
