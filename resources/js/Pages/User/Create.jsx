import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect }  from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Select from 'react-select'; //npm install react-select

export default function Create({auth}){
const { t, i18n } = useTranslation();
const {data,setData,post,errors,reset,register, trigger: triggerValidation} = useForm({
    mode: "onSubmit",
    name:'',
    email:'',
    city_id:'',
    roless:'',
    password:'',
    password_confirmation:''
})


const roless_options = [
  { value: 'arabic', label: 'Arabic' },
  { value: 'english', label: 'English' },
  { value: 'franch', label: 'France' }
]

const onSubmit=(e)=>{
e.preventDefault();
post(route('user.store'))
}

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [state, setState] = useState(null);
const [cities, setCities] = useState([]);
const [city, setCity] = useState(null);


let loadLocations = (e) => {
    e.preventDefault();

}

  useEffect(() => {
    fetch("/api/getcountry")
      .then((res) => res.json())
      .then((result) => setCountries(result))
      .catch((error) => setError(error))
      .finally(() => setIsLoaded(true));
  }, []); // <-- fetch once when component mounts
//console.log(error);

  useEffect(() => {
    if (state) {
      fetch(`/api/getstate/${state}`) // <-- compute request URL
        .then((res) => res.json())
        .then((result) => setStates(result))
        .catch((error) => setError(error))
        .finally(() => setIsLoaded(true));
    }
  }, [state]); // <-- fetch when state updates

  useEffect(() => {
    if (city) {
      fetch(`/api/getcity/${city}`) // <-- compute request URL
        .then((res) => res.json())
        .then((result) => setCities(result))
        .catch((error) => setError(error))
        .finally(() => setIsLoaded(true));
    }
  }, [city]); // <-- fetch when state updates
    return(
      
            <AuthenticatedLayout
        user={auth.user}
            header={
                <div className='flex justify-between item-center'>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 leading-tight">
                {t("Create new User")}
                </h2>
               </div>}
        >

<Head title={t("Create new User")} />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="p-6 text-gray-900 dark:text-gray-100">

<form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">



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
value={t("ُEmail")} />

<TextInput 
id="user_email" 
type="email" 
name="email" 
value={data.email}  
className="mt-1 block w-full"
onChange={e => setData('email',e.target.value)}

/>

<InputError message={errors.email} className="mt-2"/>
{/* <InputError message={state.emailError=true?errors.email:''} className="mt-2"/> */}
</div>


<div className="mt-4">
    
<InputLabel 
htmlFor="country_id"
value={t("Country")} 
/>


 <SelectInput 

id="country_id" 
name="country_id" 
className="mt-1 block w-full"
// onChange={(e) => handleOnChange(e)}
onChange={(e) => setState(e.target.value)}
 >

<option value="">{t("Select")}</option>
{countries.map((cntry) => (
          <option key={cntry.id} value={cntry.id}>
            {cntry.name}
          </option>
        ))}

    </SelectInput>

<InputError message={errors.country_id} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="state_id" 
value={t("State")} />

      <SelectInput
        id="state_id"
        name="state_id"
        className="mt-1 block w-full"
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">{t("Select")}</option>
        {states.map((state) => ( // <-- render locations state
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </SelectInput>

      <InputError message={errors.state_id} className="mt-2"/>

</div>

 <div className="mt-4">
<InputLabel 
htmlFor="city_id" 
value={t("City")}/>

      <SelectInput
        id="city_id"
        name="city_id"
        className="mt-1 block w-full"
        onChange={(e) => {setCity(e.target.value); setData('city_id',e.target.value) ; }}
      >
        <option value="">{t("Select")}</option>
        {cities.map((city) => ( // <-- render locations state
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </SelectInput>
      <InputError message={errors.city_id} className="mt-2"/>
</div>

<div className="mt-4">
<InputLabel 
htmlFor="user_password" 
value={t("Password")} />

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

<div className="mt-4">
<InputLabel 
htmlFor="user_roless" 
value={t("Languages")}/>

 
 <Select 
id="user_roless" 
name="roless" 
options={roless_options}
isMulti
onChange={ opt => [(opt.value), setData('roless',opt)]}
/>  


<InputError message={errors.roless} className="mt-2"/>
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