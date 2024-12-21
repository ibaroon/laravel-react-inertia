<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalRecords=Project::count(); 
        $query = Project::query();
        $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding


        if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
        if(request("status")){  $query->where("status",request("status"));     }

        $projects=$query->orderBy($sortField,$sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);
       // we use ProjectResource for security purposes cause project data will be avaliable on page 
        return inertia("Project/Index",[
            "projects"=> ProjectResource::collection($projects),
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
        //
         return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
       $data=$request->validated(); 
       /** @var $image\Illuminate\Http\UploadedFile  */
       $image=$data['image'] ?? null; // if $data['image'] doesnot exist $image=null
       $data['created_by']=Auth::id();
       $data['updated_by']=Auth::id();
     
       if($image)
       {
        $data['image_path']=$image->store('project/','public');
           //php artisan storage:link
       }

       Project::create($data);

       return to_route('project.index')->with('success','Project Created Successfully !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
        $totalRecords=$project->tasks()->count(); 
        $query= $project->tasks();
        $sortField= request("sort_field" , 'created_at'); // sorting by default by created_by
        $sortDirection= request("sort_direction",'desc'); // sorting by default descinding
        if(request("name"))  {  $query->where("name","like","%". request("name")."%");  }
        if(request("status")){  $query->where("status",request("status"));     }

        $tasks= $query->orderBy($sortField,$sortDirection)
        ->paginate(10)
        ->onEachSide(1);
        return inertia('Project/Show',['project'=>new ProjectResource($project),
                                       'tasks'=> TaskResource::collection($tasks),
                                       'totalRecords'=>$totalRecords,
                                       'queryParams'=>request()->query()? : null, ]); // passing project as new resource
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
        return inertia('Project/Edit',['project'=>new ProjectResource($project),]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data=$request->validated();
        $image=$data['image'] ?? null; // if $data['image'] doesnot exist $image=null
        $data['updated_by']=Auth::id();
        if($image)
        {
            if($project->image_path){Storage::disk('public')->delete($project->image_path);}
         $data['image_path']=$image->store('project/','public');
            //php artisan storage:link
        }
        $project->update($data);

        return to_route('project.index')->with('success','Project Updated Successfully !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {  $name=$project->name;
        if($project->image_path){Storage::disk('public')->delete($project->image_path);}
       $project->delete();
       return to_route('project.index')
       ->with('warning',"Project \"$name\" deleted Successfully ! ");
    
    }
}
