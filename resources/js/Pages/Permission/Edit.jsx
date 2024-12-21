import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Edit({auth,permission}){
const { t, i18n } = useTranslation();
const {data,setData,put,errors} = useForm({
  name:permission.name || ''
   
})


const onSubmit=(e)=>{
e.preventDefault();
put(route('permissions.update',permission.id))
}


    return(
      
            <AuthenticatedLayout
        user={auth.user}
            header={
                <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t("Edit Permission")}
                </h2>
               </div>}
        >

<Head title={t("Edit Permission")} />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

<form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">


<div className="mt-4">
<InputLabel 
htmlFor="role_name" 
value={t("Name")}/>

<TextInput 
id="role_name" 
type="text" 
name="name" 
value={data.name}  
className="mt-1 block w-full"
isFocused={true}
onChange={e => setData('name',e.target.value)}/>

<InputError message={errors.name} className="mt-2"/>
</div>





<div className="mt-4 text-right">
<Link href={route("permissions.index")} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">{t("Cancel")}</Link>
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