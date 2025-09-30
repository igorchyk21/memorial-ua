"use client"
import { AuthOpenType, useAuth } from "@/shared/context/Auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import AuthRegisterForm from "../../register/ui/AuthRegisterForm";
import AuthLoginForm from "../../login/ui/AuthLoginForm";
import AuthRecoveryForm from "../../recovery/ui/AuthRecoveryForm";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";

interface Props {
    show: AuthOpenType;
    setShow: Dispatch<SetStateAction<AuthOpenType>>;
}

const OffAuth = () => {

    const { showOffAuth, setShowOffAuth } = useAuth();
    const [ showAction, setShowAction ] = useState<AuthOpenType>(null);

    useEffect(()=>{
        setTimeout(() => {
            setShowAction(showOffAuth)
        }, showOffAuth===null ? 300 : 0);
    },[showOffAuth])
 
    return (
        <Offcanvas show={showOffAuth!==null}
            onHide={()=>setShowOffAuth(null)}
            scroll
            placement="end"
            style={{width:500}}>
            <Offcanvas.Header closeButton >
                <Offcanvas.Title className="align-items-top" >
                    LOGIN
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ReCaptcha>
                    {showAction === 'login' &&
                        (<AuthLoginForm/>)}                

                    {showAction === 'register' &&
                        (<AuthRegisterForm />)}     

                    {showAction === 'recovery' &&
                        (<AuthRecoveryForm />)}  
                </ReCaptcha>                                 
            </Offcanvas.Body>
            <div className="px-3">
              <p className="fs-xs">&copy; Growth Meet. All rights reserved 2025.</p>
            </div>
        </Offcanvas>
    )
}

export default OffAuth;