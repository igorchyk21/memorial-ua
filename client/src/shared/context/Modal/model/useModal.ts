"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { EModalDialogProps } from "../types/modal.type";
import useButtonsCollections from "./useButtonsCollections";

interface ModalContextType {
    showDialog:(modalParams:EModalDialogProps)=>void;
    hideDialog:()=>void;
    
}

const ModalContextDef = {
    showDialog:()=>{},
    hideDialog:()=>{},
}   

export const ModalContext = createContext<ModalContextType>(ModalContextDef);
export const useModal = () => useContext(ModalContext);

export const useModalModel = () => {
    
    const [ dialogParams, setDialogParams ] = useState<EModalDialogProps|null>(null);
    const [ isDisabled, setIsDisabled ] = useState(false);

    const handleClose = () => {
        if (dialogParams?.onHide)
            dialogParams.onHide();
        setDialogParams(prev=>prev ? ({
            ...prev,
            open:false 
        }) : null);
    }

    const { getButtons } = useButtonsCollections();

    const showDialog = (modalParams:EModalDialogProps) => {
        if (Array.isArray(modalParams.buttons))
            setDialogParams(modalParams);

        else setDialogParams({
            ...modalParams,
            buttons:getButtons(modalParams.buttons)
        })
    }   

    const hideDialog = () => {
        setDialogParams(prev=>(prev ? {...prev, open:false} : prev))
    }

    // затримка для анімації
    useEffect(()=>{
        if (dialogParams?.open === false) 
            setTimeout(() => {
                setDialogParams(null)
            }, 300);
    },[dialogParams])
    

    return {
        showDialog,
        handleClose,
        dialogParams,
        isDisabled, 
        setIsDisabled,
        hideDialog,
        
    }
}