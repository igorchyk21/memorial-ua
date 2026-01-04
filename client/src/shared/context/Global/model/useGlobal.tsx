"use client"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface GlobalContextType { 
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    smallPhotos: boolean|null;
    setSmallPhotos: Dispatch<SetStateAction<boolean|null>>;
    smallVideos: boolean|null;
    setSmallVideos: Dispatch<SetStateAction<boolean|null>>;
    heroCandlesListShow: {id:number, name:string}|null;
    setHeroCandlesListShow: Dispatch<SetStateAction<{id:number, name:string}|null>>;
}

const defaultValues = {
    loading: false,
    setLoading: ()=>{},
    smallPhotos: null,
    setSmallPhotos: ()=>{},
    smallVideos: null,
    setSmallVideos: ()=>{},
    heroCandlesListShow: null,
    setHeroCandlesListShow: ()=>{},
}

export const GlobalContext = createContext<GlobalContextType>(defaultValues);
export const useGlobal = () => useContext(GlobalContext);
 

export const useGlobalModel = () => {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ smallPhotos, setSmallPhotos ] = useState<boolean|null>(false);
    const [ smallVideos, setSmallVideos ] = useState<boolean|null>(false);
    const [ heroCandlesListShow, setHeroCandlesListShow ] = useState<{id:number, name:string}|null>(null);
    useEffect(()=>{
        if (smallPhotos === null) {
            setSmallPhotos(Boolean(localStorage.getItem('smallPhotos')));
        }
            else if (smallPhotos)localStorage.setItem('smallPhotos', '1');
                else localStorage.removeItem('smallPhotos');

    },[smallPhotos])

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
        setLoading,
        smallPhotos,
        setSmallPhotos,
        smallVideos,
        setSmallVideos,
        heroCandlesListShow,
        setHeroCandlesListShow
    }
}