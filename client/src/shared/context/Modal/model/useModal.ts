"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { EModalDialogProps } from "../types/modal.type";
import useButtonsCollections from "./useButtonsCollections";

interface ModalContextType {
    showDialog:(modalParams:EModalDialogProps)=>void;
}

const ModalContextDef = {
    showDialog:()=>{}
}

export const ModalContext = createContext<ModalContextType>(ModalContextDef);
export const useModal = () => useContext(ModalContext);

export const useModalModel = () => {
    
    const [ dialogParams, setDialogParams ] = useState<EModalDialogProps|null>(null);
    const [ isDisabled, setIsDisabled ] = useState(false);

    const handleClose = () => {
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
        setIsDisabled
    }
}