import { Children } from "react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'; //16 is the size


export default function TableHeading ({name,sortable,sortChanged=()=>{},is_sorted=()=>{},children,}){
    const sortIconStyle="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer";
    const NotsortIconStyle="px-3 py-3 flex items-center justify-between gap-1";
  

    return (
        <th onClick={ (e) => sortable==="true"? sortChanged(name) : ""}><div className={sortable==="true"? sortIconStyle : NotsortIconStyle}>{children}
        {sortable==="true" && (
 <div><ChevronUpIcon className = {is_sorted(name,"asc")} /><ChevronDownIcon className={"-mt-2 " + is_sorted(name,"desc") }/></div>
           
        )}
           </div></th>       
    )
}