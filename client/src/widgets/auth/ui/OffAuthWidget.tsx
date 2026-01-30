"use client"
import { AuthOpenType, useAuth } from "@/shared/context/Auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";
import { AuthLoginForm, AuthRecoveryForm, AuthRegisterForm } from "@/features/auth";
import { Logo } from "@/entities/header";
import { useTranslations } from "next-intl";
 
interface Props { 
    show: AuthOpenType;
    setShow: Dispatch<SetStateAction<AuthOpenType>>;
}

const OffAuthWidget = () => {
    const t = useTranslations();
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
                    <Logo/> 
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                 
                    {showAction === 'login' &&
                        (<AuthLoginForm/>)}                

                    {showAction === 'register' &&
                        (<AuthRegisterForm />)}     

                    {showAction === 'recovery' &&
                        (<AuthRecoveryForm />)}  
                                              
            </Offcanvas.Body>
            <div className="px-3">
              <p className="fs-sm fw-bold text-uppercase text-center w-100">{t('footer.titleContacts')}.</p>
            </div>
        </Offcanvas>
    )
}

export default OffAuthWidget;