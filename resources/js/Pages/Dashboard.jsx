import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/Constants';
import { Head,Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
export default function Dashboard({auth,totalPendingTasks,myPendingTasks,totalInProgressTasks,myInProgressTasks,totalCompletedTasks,myCompletedTasks,activeTasks}) {
const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                   {t("Dashboard") }
                  
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2"> {/* flex gap-2 */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <h3 className='text-amber-500 text-2xl font-semibold'>{t("Pending Tasks")}</h3>
                           <p className='text-lg mt-4'>
                            <span className='mr-2'>{myPendingTasks}</span>
                            /
                            <span className='ml-2'>{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <h3 className='text-blue-500 text-2xl font-semibold'>{t("In Progress Tasks")}</h3>
                           <p className='text-lg mt-4'>
                            <span className='mr-2'>{myInProgressTasks}</span>
                            /
                            <span className='ml-2'>{totalInProgressTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <h3 className='text-green-500 text-2xl font-semibold'>{t("Completed Tasks")}</h3>
                           <p className='text-lg mt-4'>
                            <span className='mr-2'>{myCompletedTasks}</span>
                            /
                            <span className='ml-2'>{totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                   
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-4 "> 
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <h3 className='text-gray-400 text-xl font-semibold pb-4'>{t("My Active Tasks")}</h3>
                           <div className='overflow-auto'>
                           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr>
                                    <th className="px-3 py-3">{t("ID")}</th>
                                    <th className="px-3 py-3">{t("Project")}</th>  
                                    <th className="px-3 py-3">{t("Name")}</th> 
                                    <th className="px-3 py-3">{t("Status")}</th>   
                                    <th className="px-3 py-3">{t("Due Date")}</th>
                                </tr>
                            </thead>
                            <tbody>
                            { activeTasks.data.map((task)=>(
                            <tr key={task.id}>
                                <td className='px-3 py-2'>{task.id}</td>
                                <td className='px-3 py-2 hover:underline'><Link href={route("project.show",task.project_id)}>{task.project.name}</Link></td>
                                <td className='px-3 py-2 hover:underline'><Link href={route("task.show",task.id)}>{task.name}</Link></td>
                                <td className='px-3 py-2 text-nowrap'> 
    <span className= {"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP [task.status]}>
   {PROJECT_STATUS_TEXT_MAP[task.status]}
   </span>
   </td>
                                <td className='px-3 py-2'>{task.due_date}</td>
                            </tr>
                           ))}
                            </tbody>
                           </table>
                           </div>
                        </div>
                    </div>                  
                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
