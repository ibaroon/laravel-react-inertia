import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import TasksTable from './TasksTable';

export default function Index({auth,tasks,queryParams=null,totalRecords,success,warning}){
   
  
    return (
        <AdminAuthenticatedLayout
        user={auth.user}
            header={
                <div className='flex justify-between item-center'>
                
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                    Tasks
                </h2>
                {/* <Link href={route("task.create")} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-add hover:bg-emerald-600'>Add New</Link>
                   */}
                </div>
            }
        >

<Head title="Tasks" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    { success && (<div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
 {success}
</div>)}

{ warning && (<div className='bg-orange-500 py-2 px-4 text-white rounded mb-4'>
 {warning}
</div>)}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
             <TasksTable tasks={tasks} queryParams={queryParams} totalRecords={totalRecords}/>
            </div>
        </div>
    </div>
</div>
        </AdminAuthenticatedLayout>
    )
}
