import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/Constants';
import TasksTable from '../Task/TasksTable';
import { useTranslation } from "react-i18next";

export default function Show({auth,project,tasks,queryParams,totalRecords}){
  const { t, i18n } = useTranslation();
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
              <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t('Project Dtails') + project.name}
                </h2>
                <Link href={route('project.edit',project.id)} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-add hover:bg-emerald-600'>{t("Edit")}</Link>
                </div>
            }
        >

 <Head title={t('Project Dtails') + project.name} />

<div className="pb-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
{/* <pre>{JSON.stringify(project)}</pre> */}

<div className="py-12">
    
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className='grid gap-1 grid-cols-2 mt-2'>
<div>
    <div>
        <label className='font-bold text-lg'>{t("ID")} </label>
        <p className='mt-1'>{project.id}</p>
    </div>
    <div className='mt-4'>
        <label className='font-bold text-lg'>{t("Name")} </label>
        <p className='mt-1'>{project.name}</p>
    </div>
    <div className="mt-4">
        <label className="font-bold text-lg">{t("Status")} </label>
        <p className="mt-1">
            <span className={
                            "px-2 py-1 rounded text-white " +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                        >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
        </p>
    </div>
    <div className='mt-4'>
        <label className='font-bold text-lg'>{t("Created By")}</label>
        <p className='mt-1'>{project.createdBy.name}</p>
    </div>  
                 
</div>

<div>
    
                   <div>
                    <label className="font-bold text-lg">{t("Deadline")}</label>
                    <p className="mt-1">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">{t("Create Date")}</label>
                    <p className="mt-1">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">{t("Updated By")}</label>
                    <p className="mt-1">{project.updatedBy.name}</p>
                  </div>
    
</div>
</div>

<div className="mt-4">
                <label className="font-bold text-lg">{t("Description")} </label>
                <p className="mt-1">{project.description}</p>
              </div>
      
           </div>
        </div>

</div>
    </div>
        </div>
             </div>
                </div>

    <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
               
               <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideProjectCoulmn = {true}
                totalRecords={totalRecords}
               
              /> 
            </div>
          </div>
        </div>
    </div>
            
            </AuthenticatedLayout>
    )
}