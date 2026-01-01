import { ReactNode } from "react";
import { ButtonProps } from "react-bootstrap";

export type EModalButtonsCollection = 
    | 'YesCancel'
    | 'DeleteCancel';

export interface EModalButton {
    title:string|ReactNode;
    buttonProps?:ButtonProps;
    onClick?:()=>void;
}

export interface EModalDialogProps {
    open:boolean; 
    title:string;
    content:string | ReactNode;
    width?:number;
    noCloseOnClickButton?:boolean;
    buttons:EModalButton[]  | EModalButtonsCollection;
    onClickConfirmButton?:()=>{};
    className?:string;
    onHide?:()=>void;
}

