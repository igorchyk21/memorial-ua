"use client"
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useFilter = (setShow:Dispatch<SetStateAction<boolean>>) => {

    const [ region, setRegion ] = useQueryState<string>('region');
    const [ regionValue, setREgionValue ] = useState<string>('');

    const handleChangeRegion = (region:string)=> {
        setRegion(region);
        setShow(false);
    }

    useEffect(()=>{
        if (region!==undefined)
            setREgionValue(region)
    },[region])

    return {
        regionValue,
        setREgionValue,
        handleChangeRegion
    }
}

export default useFilter;