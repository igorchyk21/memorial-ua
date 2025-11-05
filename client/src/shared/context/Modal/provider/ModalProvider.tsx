"use client"
import { CommonComponentChildren } from "@/types";
import { ModalContext, useModalModel } from "../model/useModal";
import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";
import { EModalButton } from "../types/modal.type";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle"; 
import { useEffect, useState } from "react";


 
export const ModalProvider = ({children}:CommonComponentChildren) => {

    const { showDialog, hideDialog, handleClose, dialogParams, isDisabled, setIsDisabled } = useModalModel();
 
    
    return (
        <ModalContext.Provider
            value={{
                showDialog,
                hideDialog
            }}>
            {children} 
            <div>
            {Boolean(dialogParams) &&
            (<Dialog  
                style={{width:dialogParams?.width||600}}
                className={dialogParams?.className}
                appendTo={document.body} 
                header={dialogParams?.title}
                draggable={false}
                visible={dialogParams?.open} 
                footer={(Array.isArray(dialogParams?.buttons)) &&  dialogParams?.buttons.length > 0
                ?(<>
                    {(dialogParams?.buttons as EModalButton[]).map((btn,i)=>{
                        return (
                            <Button
                                disabled={isDisabled}
                                key={i}
                                
                                className="ms-1"
                                {...btn.buttonProps}
                                onClick={async ()=>{
                                    setIsDisabled(true);
                                    if (typeof btn.onClick === 'function') {
                                        await btn.onClick();
                                    }

                                    if ((typeof dialogParams?.onClickConfirmButton === 'function') && (i===0)) {
                                        await dialogParams.onClickConfirmButton();
                                    }
                                    setIsDisabled(false);
                                    handleClose();
                                }}>

                                {i===0 
                                    ?(<SpinnerTitle showSpinner={isDisabled} titleButton={btn.title}/>)
                                    :(<>{btn.title}</>)}
                                
                            </Button>
                        )
                    })}

                </>) : undefined}
                onHide={handleClose}>
            
            <div> 
            {typeof dialogParams?.content === 'string'
                ?(<p>{dialogParams.content}</p>)
                :(<>{dialogParams?.content}</>)} 
            
            </div>
            </Dialog>)}
            
            </div>
        </ModalContext.Provider>
    )
}

export default ModalProvider;