"use client"
import { GlobalContext, useGlobalModel } from "./model/useGlobal"
import { CommonComponentChildren } from "@/types";

export const GlobalProvider = ({children}:CommonComponentChildren) => {

    const {loading, setLoading} = useGlobalModel();
 
    return (
        <GlobalContext.Provider 
            value={{
                loading,
                setLoading 
            }}>
            {children}
        </GlobalContext.Provider>
    )
}