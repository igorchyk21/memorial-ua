"use client"
import { createContext, createRef, useContext, useState } from "react";
import { Variant } from "react-bootstrap/esm/types";
import { v4 as uuidv4 } from 'uuid';

type ToastType = {
    id:string;
    message:string;
    type:Variant;
    icon:any;
    nodeRef:any;
}

interface ToastContextType {
    showToast:(mess:string, toastType:Variant)=>void;
}

const ToastContextDef = {
    showToast:()=>{}
}

// Створюємо контекст для Toast
export const ToastContext = createContext<ToastContextType>(ToastContextDef);
export const useToast = () => useContext(ToastContext);


export const useToastModel = () => {


    const [toasts, setToasts] = useState<ToastType[]>([]);

    // Функція - показує новий тост
    const showToast = (message:string, type:Variant = 'info') => {
        let icon = null;
        switch (type) {
        case 'danger':
            icon = <i className="bi bi-exclamation-octagon me-1"></i>;
            break;
        case 'success':
            icon = <i className="bi bi-check-circle me-1"></i>;
            break;
        case 'warning':
            icon = <i className="bi bi-exclamation-triangle me-1"></i>;
            break;
        default:
            icon = <i className="bi bi-info-circle me-1"></i>;
        }
  
        // Створюємо новий тост із унікальним nodeRef
        const newToast:ToastType = {
            id: uuidv4(),
            message,
            type,
            icon,
            nodeRef: createRef(), // використання createRef замість useRef
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    // Функція для закриття тосту
    const closeToast = (id:string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };


    return {
        showToast,
        closeToast,
        toasts
    }
}