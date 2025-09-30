"use client"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface GlobalContextType { 
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
    loading: false,
    setLoading: ()=>{},
}

export const GlobalContext = createContext<GlobalContextType>(defaultValues);
export const useGlobal = () => useContext(GlobalContext);
 

export const useGlobalModel = () => {

    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        const html = document.documentElement;
        const prevCursor = html.style.cursor;
        html.style.cursor = loading ? 'wait !important' : prevCursor;

        return () => {
            document.body.style.cursor = prevCursor; // скидаємо при unmount
        };
    }, [loading]);

    return {
        loading,
        setLoading
    }
}