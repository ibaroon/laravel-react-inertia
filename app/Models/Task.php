<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable=['image_path','name','description','status','due_date','created_by','updated_by','project_id','priority','assigned_user_id'];

    public function project()
    {
        return $this->belongsTo(Project::class,'project_id');
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class,'assigned_user_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class,'updated_by');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class,'created_by');
    }

 
}
