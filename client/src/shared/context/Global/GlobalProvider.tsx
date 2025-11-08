"use client"
import { GlobalContext, useGlobalModel } from "./model/useGlobal"
import { CommonComponentChildren } from "@/types";

export const GlobalProvider = ({children}:CommonComponentChildren) => {

    const values = useGlobalModel();
 
    return (
        <GlobalContext.Provider 
            value={values}>
            {children}
        </GlobalContext.Provider>
    )
}