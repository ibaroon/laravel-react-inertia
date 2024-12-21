<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$tasks=Task::get();
        $totalRecords=Task::count();
        $query = Task::query();

        $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding

        if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
        if(request("status")){  $query->where("status",request("status"));     }

        $tasks=$query->orderBy($sortField,$sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);
       // we use TaskResource for security purposes cause task data will be avaliable on page 
        return inertia("Task/Index",[
            "tasks"=> TaskResource::collection($tasks),
            'totalRecords'=>$totalRecords,
            'queryParams'=>request()->query()? : null,
            'success' => session('success'),
            'warning' => session('warning'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    { 
        
        $projects=Project::orderBy('name')->get();
        $users=User::orderBy('name')->get();
        return inertia("Task/Create",[
            'projects'=>ProjectResource::collection($projects),
            'users'=>UserResource::collection($users),
            // 'projects' => Project::when($request->term, function($query,$term)
            // {$query->where("name","like","%".$term."%");})->paginate()
            ] );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data=$request->validated(); 
        /** @var $image\Illuminate\Http\UploadedFile  */
        $image=$data['image'] ?? null; // if $data['image'] doesnot exist $image=null
        $data['created_by']=Auth::id();
        $data['updated_by']=Auth::id();
      
        if($image)
        {
         $data['image_path']=$image->store('task/','public');
            //php artisan storage:link
        }
 
        Task::create($data);
 
        return to_route('task.index')->with('success','Task Created Successfully !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
       
       
        return inertia('Task/Show',['task'=>new TaskResource($task),
                                      
                                       
                                        ]); // passing task as new resource
   
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects=Project::orderBy('name')->get();
        $users=User::orderBy('name')->get();
        return inertia('Task/Edit',[
            'task'=>new TaskResource($task),
        'projects'=>ProjectResource::collection($projects),
            'users'=>UserResource::collection($users),]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data=$request->validated();
        $image=$data['image'] ?? null; // if $data['image'] doesnot exist $image=null
        $data['updated_by']=Auth::id();
        if($image)
        {
            if($task->image_path){Storage::disk('public')->delete($task->image_path);}
         $data['image_path']=$image->store('task/','public');
            //php artisan storage:link
        }
        $task->update($data);

        return to_route('task.index')->with('success','Task Updated Successfully !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name=$task->name;
        if($task->image_path){Storage::disk('public')->delete($task->image_path);}
       $task->delete();
       return to_route('task.index')
       ->with('warning',"Task \"$name\" deleted Successfully ! ");
    }
    
    public function myTasks ()
    {
         $user=Auth::user();
         $totalRecords=Task::where('assigned_user_id',$user->id)->count();
         $query = Task::query()->where('assigned_user_id',$user->id);
 
         $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
         $sortDirection= request("sort_direction",'desc'); // sorting by default descinding
 
         if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
         if(request("status")){  $query->where("status",request("status"));     }
 
         $tasks=$query->orderBy($sortField,$sortDirection)
                         ->paginate(10)
                         ->onEachSide(1);
        // we use TaskResource for security purposes cause task data will be avaliable on page 
         return inertia("Task/Index",[
             "tasks"=> TaskResource::collection($tasks),
             'totalRecords'=>$totalRecords,
             'queryParams'=>request()->query()? : null,
             'success' => session('success'),
             'warning' => session('warning'),
         ]);
    }

    public function AdminmyTasks ()
    {
         $user=Auth::user();
         $totalRecords=Task::where('assigned_user_id',$user->id)->count();
         $query = Task::query()->where('assigned_user_id',$user->id);
 
         $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
         $sortDirection= request("sort_direction",'desc'); // sorting by default descinding
 
         if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
         if(request("status")){  $query->where("status",request("status"));     }
 
         $tasks=$query->orderBy($sortField,$sortDirection)
                         ->paginate(10)
                         ->onEachSide(1);
        // we use TaskResource for security purposes cause task data will be avaliable on page 
         return inertia("Admin/Task/Index",[
             "tasks"=> TaskResource::collection($tasks),
             'totalRecords'=>$totalRecords,
             'queryParams'=>request()->query()? : null,
             'success' => session('success'),
             'warning' => session('warning'),
         ]);
    }
}
