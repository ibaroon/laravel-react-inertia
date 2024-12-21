import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TableHeading from '@/Components/TableHeading';
import { Link, router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/Constants';
export default function TasksTable({tasks,queryParams=null,hideProjectCoulmn = false,totalRecords}){
    const { t, i18n } = useTranslation();
    queryParams=queryParams || {} // queryParams it either be value or and object
//---------------------------------------------------------------------------------
const searchFieldChange = (name,value) => {
    if(value){  queryParams[name] = value} 
    else { delete queryParams[name]}
    router.get(route('task.index'),queryParams)
    };
//---------------------------------------------------------------------------------
const onKeyPress = (name,e) =>{
    if(e.key !== 'Enter') return;
    searchFieldChange(name,e.target.value);
    }
//---------------------------------------------------------------------------------
const deleteTask = (task) =>{
    if(!window.confirm('Are you sure deleting Task ?')) 
        {return;}
   router.delete(route('task.destroy',task.id))
    }
//---------------------------------------------------------------------------------
const sortChanged = (name) => {
        if(name == queryParams.sort_field){ // that means its already sorted by this field so we just need to change sorting direction
            if(queryParams.sort_direction === 'asc') { queryParams.sort_direction='desc';} 
            else { queryParams.sort_direction='asc';}
        }
        else {
            queryParams.sort_field=name;
            queryParams.sort_direction='desc';
        }
        router.get(route('task.index'),queryParams)
    }
//---------------------------------------------------------------------------------
    // const sortIconStyle="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer";
const is_sorted=($field,$direction)=>{
       return "w-4 " + (queryParams.sort_field === $field && queryParams.sort_direction === $direction ? "text-white" : "") 
    }
//---------------------------------------------------------------------------------
    return(
        <>
        <div className='overflow-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
              <tr className="text-nowrap">
                  <TableHeading name="id" sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("ID")}</TableHeading>
                  <TableHeading name="Image" sortChanged={sortChanged} is_sorted={is_sorted} sortable="flase">{t("Image")}</TableHeading>
                  {!hideProjectCoulmn && <TableHeading name="project_id" sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("Project")}</TableHeading> }
                  <TableHeading name="name"  sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("Name")}</TableHeading>
                  <TableHeading name="status"  sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("Status")}</TableHeading>
                  <TableHeading name="created_at"  sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("Create Date")}</TableHeading>
                  <TableHeading name="due_date"  sortChanged={sortChanged} is_sorted={is_sorted} sortable="true">{t("Deadline")}</TableHeading>
                  <TableHeading name="Created By" sortChanged={sortChanged} is_sorted={is_sorted} sortable="flase">{t("Created By")}</TableHeading>
                  
                  <TableHeading name="Actions" sortChanged={sortChanged} is_sorted={is_sorted} sortable="flase">{t("Actions")}</TableHeading>
                  
                  {/* <th className="px-3 py-3">Image</th>
                  <th onClick={ (e) => sortChanged('name')}><div className={sortIconStyle}>Name  </div></th> 
                  <th onClick={ (e) => sortChanged('status')} ><div className={sortIconStyle}>Status </div></th>
                  <th onClick={ (e) => sortChanged('created_at')} ><div className={sortIconStyle}>Create Date </div></th>
                  <th onClick={ (e) => sortChanged('due_date')} ><div className={sortIconStyle}>Due Date </div></th>
                  <th className="px-3 py-3">Created By</th>
                  <th className="px-3 py-3 text-right">Actions</th>*/}




              </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
              <tr className="text-nowrap">
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  {!hideProjectCoulmn &&<th className="px-3 py-3"></th>}
                  <th className="px-3 py-3">
                      <TextInput className="w-full" 
                                 placeholder={t("Name")}
                                 onBlur={e => searchFieldChange('name',e.target.value)}
                                 onKeyPress={e => onKeyPress('name', e)}
                                 defaultValue={queryParams.name}
                                 /></th>
                  <th className="px-3 py-3">
                      <SelectInput className="w-full" 
                                   onChange={e => searchFieldChange('status',e.target.value)}
                                   defaultValue={queryParams.status}>
<option value="">{t("Status")}</option>
<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>

                                      </SelectInput>
                                   </th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                  <th className="px-3 py-3"></th>
                 




              </tr>
          </thead>

          <tbody>
              {tasks.data.map((task) => (
                  <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<td className='px-3 py-2'>{task.id}</td>
<td className='px-3 py-2'><img src={task.image_path} alt="" style={{ width:80}}/></td>
{!hideProjectCoulmn &&<td className='px-3 py-2'>{task.project.name}</td>}
<td className='px-3 py-2 text-gray-400 hover:underline hover:text-gray-950'><Link href={route("task.show",task.id)}>{task.name}</Link></td>
<td className='px-3 py-2 text-nowrap'>
<span className= {"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP [task.status]}>
{TASK_STATUS_TEXT_MAP[task.status]}
</span>
</td>
<td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
<td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
<td className='px-3 py-2 text-nowrap'>{task.createdBy.name}</td>

<td className='px-3 py-2 text-nowrap'>
<Link href={route('task.edit',task.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>{t("Edit")}</Link>
<button onClick={e=>deleteTask(task)}  className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>{t("Delete")}</button>

</td>
</tr>
              ))}

          </tbody>
       </table>
        </div>
        <Pagination links={tasks.meta.links} totalRecords={totalRecords}/> 
      </> 
    )
}