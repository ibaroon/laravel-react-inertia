<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Task;

use App\Http\Resources\TaskResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
   public function index()
   {
    $user=Auth::user();
    $totalPendingTasks=Task::where('status','pending')->count();
    $myPendingTasks=Task::where(['status'=>'pending','assigned_user_id'=>$user->id])->count();

    $totalInProgressTasks=Task::where('status','in_progress')->count();
    $myInProgressTasks=Task::where(['status'=>'in_progress','assigned_user_id'=>$user->id])->count();

    $totalCompletedTasks=Task::where('status','completed')->count();
    $myCompletedTasks=Task::where(['status'=>'completed','assigned_user_id'=>$user->id])->count();

    $activeTasks=Task::whereIn('status',['pending','in_progress'])
    ->where('assigned_user_id',$user->id)
    ->limit(10)
    ->get();
    $activeTasks=TaskResource::collection($activeTasks);
    return inertia('Dashboard',
    compact('totalPendingTasks','myPendingTasks','totalInProgressTasks','myInProgressTasks','totalCompletedTasks','myCompletedTasks','activeTasks'));
   }

   public function admin()
   {
    $user=Auth::user();
    $totalPendingTasks=Task::where('status','pending')->count();
    $myPendingTasks=Task::where(['status'=>'pending','assigned_user_id'=>$user->id])->count();

    $totalInProgressTasks=Task::where('status','in_progress')->count();
    $myInProgressTasks=Task::where(['status'=>'in_progress','assigned_user_id'=>$user->id])->count();

    $totalCompletedTasks=Task::where('status','completed')->count();
    $myCompletedTasks=Task::where(['status'=>'completed','assigned_user_id'=>$user->id])->count();

    $activeTasks=Task::whereIn('status',['pending','in_progress'])
    ->where('assigned_user_id',$user->id)
    ->limit(10)
    ->get();
    $activeTasks=TaskResource::collection($activeTasks);
    return inertia('Admin/Dashboard',
    compact('totalPendingTasks','myPendingTasks','totalInProgressTasks','myInProgressTasks','totalCompletedTasks','myCompletedTasks','activeTasks'));
   }
}
