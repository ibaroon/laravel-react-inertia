import {Link} from '@inertiajs/react';
import { useTranslation } from "react-i18next";
export default function Pagination({links,totalRecords}){
    const { t, i18n } = useTranslation();
    return (
        <nav className="text-center mt-4">
{links.map(link => (
    <Link 
   // preserveScroll // prevent page moves to the top after press next page
    href={link.url || ""}
    key={link.label}
    className={"inline-block py-2 px-3 rounded-lg text-gray-400 text-xs " + 
        (link.active ? "bg-gray-950 " : " " ) + 
        (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-950")}
    dangerouslySetInnerHTML={{__html: link.label}} ></Link>
))}
&nbsp;&nbsp;&nbsp;
<p className='inline-block py-2 px-3 rounded-lg text-gray-200 text-xs bg-gray-950'> {totalRecords} {t("records")}  </p>

        </nav>
    );
}
