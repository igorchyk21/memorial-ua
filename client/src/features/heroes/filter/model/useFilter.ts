"use client"
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@bprogress/next/app";       // <-- ВАЖЛИВО
import { useSetMultipleQuery } from "@/shared/hooks/query/useSetMultipleQuery";

const useFilter = (setShow:Dispatch<SetStateAction<boolean>>) => {

    const pathname = usePathname();   
    const router = useRouter();
    const [ region, setRegion ] = useQueryState<string>('region');
    const [ regionValue, setREgionValue ] = useState<string>('');
    const miltipleQuery = useSetMultipleQuery();

    const handleChangeRegion = (region:string)=> {

        if (pathname === '/heroes') 
            miltipleQuery({
                search:'',
                page:'1',
                region:region
            })

        else router.push(`/heroes?region=${region}`)

        setShow(false);
    }

    useEffect(()=>{
        if (region!==undefined)
            setREgionValue(region)
    },[region])

    useEffect(()=>{
        console.log(region)
        setREgionValue(prev => (prev === region ? prev : region||''));
    }, [pathname])    

    return {
        regionValue,
        setREgionValue,
        handleChangeRegion
    }
}

export default useFilter;