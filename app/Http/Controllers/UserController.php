<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

use App\Http\Resources\UserCrudResource;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalRecords=User::count(); 
        $query = User::query();
        // dd($query);
        $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding


        if(request("name")) {  $query->where("name","like","%". request("name")."%");  }
        if(request("email")){  $query->where("email","like","%". request("email")."%");  }

        $users=$query->orderBy($sortField,$sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);
        
       // we use UserResource for security purposes cause user data will be avaliable on page 
        return inertia("User/Index",[
            "users"=> UserCrudResource::collection($users),
            'totalRecords'=>$totalRecords,
            'queryParams'=>request()->query()? : null,
            'success' => session('success'),
            'warning' => session('warning'),
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data=$request->validated();
        $data['email_verified_at']= time(); 
        // $data['created_by']=Auth::id();
        // $data['updated_by']=Auth::id();
        $data['password']= Hash::make($request->password);
        $data['roless']=collect($data['roless'])->pluck('value')->join(',');
        //dd($data);
        User::create($data);
 
        return to_route('user.index')->with('success','User Created Successfully !');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit',['user'=>new UserCrudResource($user),]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data=$request->validated();
        
       
        // $data['updated_by']=Auth::id();
       $password=$data['password'] ?? null;
       if($password)
       { $data['password']= Hash::make($password);}
       else{ unset($data['password']);}
        $user->update($data);

        return to_route('user.index')->with('success','User Updated Successfully !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name=$user->name;
       
       $user->delete();
       return to_route('user.index')
       ->with('warning',"User \"$name\" deleted Successfully ! ");
    }
}
