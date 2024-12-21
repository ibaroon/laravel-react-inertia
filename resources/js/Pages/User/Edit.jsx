import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useTranslation } from "react-i18next";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({auth,user}){
    const { t, i18n } = useTranslation();
const {data,setData,post,errors} = useForm({
   
    name:user.name || '',
    email:user.email || '',
    password:'',
    password_confirmation:'',
    _method: 'PUT'
})

const onSubmit=(e)=>{
e.preventDefault();
post(route('user.update',user.id))
}
    return(
      
            <AuthenticatedLayout
        user={auth.user}
            header={
                <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t("Edit User") + user.name}
                </h2>
               </div>}
        >

<Head title= {t("Edit User")} />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

<form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
    {user.image_path && <div className="mb-4"><img src={user.image_path} className="w-64 rounded"/></div>}

    <div>
<InputLabel 
htmlFor="user_name" 
value={t("Name")}/>

<TextInput 
id="user_name" 
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
htmlFor="user_email" 
value={t("ُEmail")}/>

<TextInput 
id="user_email" 
type="email" 
name="email" 
value={data.email}  
className="mt-1 block w-full"
onChange={e => setData('email',e.target.value)}/>

<InputError message={errors.email} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="user_password" 
value={t("Password")}/>

<TextInput 
id="user_password" 
type="password" 
name="password" 
value={data.password}  
className="mt-1 block w-full"
onChange={e => setData('password',e.target.value)}/>

<InputError message={errors.password} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="user_password_confirmation" 
value={t("Confirm Password")}/>

<TextInput 
id="user_password_confirmation" 
type="password" 
name="password_confirmation" 
value={data.password_confirmation}  
className="mt-1 block w-full"
onChange={e => setData('password_confirmation',e.target.value)}/>

<InputError message={errors.password_confirmation} className="mt-2"/>
</div>

<div className="mt-4 text-right">
<Link href={route('user.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">{t("Cancel")}</Link>
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