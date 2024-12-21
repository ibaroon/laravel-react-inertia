import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head,useForm,router } from '@inertiajs/react';
import React, { useState,useEffect }  from 'react';
import Select from 'react-select'; //npm install react-select
import { useTranslation } from "react-i18next";



export default function Show({auth,RolePermissions,RoleUsers,AvaPermissions,AvaUsers,role,success,warning}){
  // console.log(RoleUsers);
  // console.log(RolePermissions);
  // console.log(AvaPermissions);
const { t, i18n } = useTranslation();
const [roleId,setRoleId]= useState(null);
const {data,setData,post} = useForm({  
  permission:'',
  users:'' ,
  role_id:'',
    _method: 'POST'
});

useEffect(() => {
  setData('role_id',role.id);
  setRoleId(role.id);
 }, []); // <-- fetch when state updates

  const onSubmit=(e)=>{
    e.preventDefault(); 
    post(route('roles.addRolePermissions'))
    }

    const onSubmiti=(e)=>{
      e.preventDefault();     
      post(route('roles.addRoleUsers'))
      }

const deleteUser = (user,roleId) =>{
    if(!window.confirm('Are you sure deleting User from this role ?')) 
        {return;}
   router.delete(route('roles.destroyUser',{"user":user,"roleId":roleId}))
    }

const deletePermission = (permission,roleId) =>{
    if(!window.confirm('Are you sure deleting Permission from this role ?')) 
        {return;}
   router.delete(route('roles.destroyPermission',{"permission":permission,"roleId":roleId}))
    }

   
    
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
              <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t("Role Dtails") + role.name}
                </h2>
                <Link href={route("roles.edit",role)} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-add hover:bg-emerald-600'>{t("Edit")}</Link>
                </div>
            }
        >

 <Head title={t("Role Dtails") + role.name} />

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

<div className="py-0">
    
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
   
    <div className='grid gap-1 grid-cols-2 mt-2'>
<div>

   
<div className='mt-4'>
<form onSubmit={onSubmiti} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
<label className='font-bold text-lg'>{t("Users")}</label>
<Select 
id="users" 
name="users" 
options={AvaUsers.map(opt => ({ label: opt.name, value: opt.id }))}
isMulti
onChange={ (opt) => {[setData('users',opt)];}}

/>
<button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">{t("Add")}</button>

</form>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <tbody>
<tr><td colSpan={3}>&nbsp;</td></tr>     
{RoleUsers.map((usr)=>
     
     <tr key={usr.id}>  
      <td></td>
      <td className='mt-1 mx-10'>{usr.name}</td>
      <td><button onClick={e=>deleteUser(usr,roleId)}className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1 cursor-pointer '>{t("Delete")}</button></td>       
     </tr>
        )}
        </tbody>
</table>
       
        
</div>
   
                 
</div>

<div>


<div className='mt-4'>
<form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

<label className='font-bold text-lg'>{t("Permissions")}</label>
<Select 
id="permission" 
name="permission" 
options={AvaPermissions.map(opt => ({ label: opt.name, value: opt.id }))}
isMulti
onChange={ opt => [setData('permission',opt)]}
/>
<button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">{t("Add")}</button>

</form>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<tbody><tr><td colSpan={3}>&nbsp;</td></tr>
        
        {RolePermissions.map((per)=>
        <tr  key={per.id}>
        <td></td>
        <td className='mt-1 mx-10'>{per.name}</td>
        <td><button onClick={e=>deletePermission(per,roleId)}className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1 cursor-pointer '>{t("Delete")}</button></td>       
        </tr>
        )}
 </tbody>     
</table>   
    </div>      
               
    
</div>
              </div>      
           </div>
        </div>

</div>

    </div>
        </div>
             </div>
               

  
            
            </AuthenticatedLayout>
    )
}