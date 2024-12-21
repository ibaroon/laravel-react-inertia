import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";
import { useTranslation } from "react-i18next";
export default function Edit({auth,task,projects,users}){
    const { t, i18n } = useTranslation();
const {data,setData,post,errors,reset} = useForm({
    image:'',
    project_id:task.project_id ||'',
    name:task.name || '',
    status:task.status || '',
    description:task.description || '',
    due_date:task.due_date || '',
    assigned_user_id:task.assigned_user_id||'',
    priority:task.priority||'',
    _method: 'PUT'
})

const onSubmit=(e)=>{
e.preventDefault();
post(route('task.update',task.id))
}
    return(
      
            <AuthenticatedLayout
        user={auth.user}
            header={
                <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t("Edit Task")} "{task.name}"
                </h2>
               </div>}
        >

<Head title={t("Edit Task")} />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

<form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
    {task.image_path && <div className="mb-4"><img src={task.image_path} className="w-64 rounded"/></div>}

    <div >
<InputLabel 
htmlFor="task_project_id" 
value={t("Project")}/>

<SelectInput 
id="task_project_id" 
name="project_id" 
value={data.project_id}
className="mt-1 block w-full"
onChange={(e) => setData('project_id',e.target.value)}>

<option value="">Select Project</option>
{projects.data.map((project) => (
<option value={project.id} key={project.id}>{project.name}</option>
))}

    </SelectInput>

<InputError message={errors.project_id} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_image_path" 
value={t("Image")}/>

<TextInput 
id="task_image_path" 
type="file" 
name="image_path" 
className="mt-1 block w-full"
onChange={e => setData('image',e.target.files[0])}/>

<InputError message={errors.image_path} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_name" 
value={t("Name")}/>

<TextInput 
id="task_name" 
type="text" 
name="name" 
value={data.name}  
className="mt-1 block w-full"
isFocused={true}
onChange={e => setData('name',e.target.value)}/>

<InputError message={errors.name} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_description" 
value={t("Description")}/>

<TextAreaInput 
id="task_description" 
name="description" 
value={data.description}  
className="mt-1 block w-full"
onChange={(e) => setData('description',e.target.value)}/>

<InputError message={errors.description} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_due_date" 
value={t("Deadline")}/>

<TextInput 
id="task_due_date" 
type="date" 
name="due_date" 
value={data.due_date}  
className="mt-1 block w-full"
onChange={e => setData('due_date',e.target.value)}/>

<InputError message={errors.due_date} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_status" 
value={t("Status")}/>

<SelectInput 
id="task_status" 
name="status" 
value={data.status}
className="mt-1 block w-full"
onChange={(e) => setData('status',e.target.value)}>

<option value="">Select Status</option>
<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>

    </SelectInput>

<InputError message={errors.status} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_priority" 
value={t("Priority")}/>

<SelectInput 
id="task_priority" 
name="priority" 
value={data.priority}
className="mt-1 block w-full"
onChange={(e) => setData('priority',e.target.value)}>

<option value="">Select Priority</option>
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>

    </SelectInput>

<InputError message={errors.priority} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="task_assigned_user" 
value={t("Assigned User")}/>

<SelectInput 
id="task_assigned_user" 
name="assigned_user_id" 
value={data.assigned_user_id}
className="mt-1 block w-full"
onChange={(e) => setData('assigned_user_id',e.target.value)}>

<option value="">Select User</option>
{users.data.map((user) => (
<option value={user.id} key={user.id}>{user.name}</option>
))}

    </SelectInput>

<InputError message={errors.assigned_user_id} className="mt-2"/>
</div>

<div className="mt-4 text-right">
<Link href={route('task.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">{t("Cancel")}</Link>
<button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">{t("Submit")}</button>
</div>
</form>

                    </div>
            </div>
        </div>
    </div>
</div>

        </AuthenticatedLayout>
    )
}