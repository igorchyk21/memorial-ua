import { useAuth } from "@/shared/context/Auth";
import OtpInput4 from "@/shared/ui/forms/OtpInput4";
import { useTranslations } from "next-intl";
import { FormEvent, useRef, useState } from "react";
import { Button, Form, Nav, NavLink } from "react-bootstrap";
import FormStepPassword from "./FormStepPassword";
import FormStepOtp from "./FormStepOtp";
import FormStepUserName from "./FormStepUserName";
import { Formik } from "formik";
import useAuthRegister, { initFormikValue } from "../model/useAuthRegister";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import FormStepRegFinish from "./FormStepRegFinish";
import { FormikAuthRegister } from "../../types/auth.types";
import AuthLoginServices from "../../login/ui/AuthLoginServices";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";
import { GoogleOAuthProvider } from "@react-oauth/google";
import conf from "@/shared/config/conf";

const AuthRegisterForm = () => {

    const  t  = useTranslations();
    const { setShowOffAuth } = useAuth();    
    const { registerStep, setRegisterStep, handleSubmit } = useAuthRegister();
    return  (
         <div className="h-100 d-flex flex-column">
            
            <h2 className="h2">{t('auth.createAccount')}</h2>
            <Nav className="fs-sm mb-4">
                {t('auth.createAccountInfo')}
                <NavLink as="span" 
                    className="p-0 ms-2 animate-underline cursor-pointer"
                    onClick={()=>setShowOffAuth('login')}>
                    <a className="text-underline text-body-emphasis">{t('auth.login')}</a>
                </NavLink>
            </Nav>
  
            
            <Formik<FormikAuthRegister> initialValues={initFormikValue} onSubmit={handleSubmit}> 
                {(formik)=>(
                    <Form onSubmit={formik.handleSubmit}>

                        {registerStep == 1 &&
                            (<FormStepUserName/>)}

                        {registerStep == 2 && 
                            (<FormStepOtp/>)}

                        {registerStep == 3 &&
                            (<FormStepPassword/>)}

                        {registerStep <= 3 &&
                        (<><Button type="submit" size="lg" 
                            className="w-100"
                            disabled={formik.isSubmitting}>
                            <SpinnerTitle 
                                showSpinner={formik.isSubmitting}
                                titleButton={t(registerStep<3 ? 'buttons.continue' : 'buttons.finish')}/>
                        </Button>

                        {registerStep>1 &&
                            (<span className="d-block text-center mt-4 p-0 ms-2 animate-underline cursor-pointer">
                                <span className="animate-target"
                                    onClick={(e)=>setRegisterStep(prev=>prev-1)}>
                                        <i className="bi bi-arrow-left me-1"></i> {t('buttons.back')}</span>
                            </span>)}
                        </>)}

                        {registerStep == 4 && 
                            (<FormStepRegFinish disabled={formik.isSubmitting}/>)}

                        <GoogleOAuthProvider clientId={conf.authGoogleId}>
                            <AuthLoginServices disabled={formik.isSubmitting}/>  
                        </GoogleOAuthProvider>
                    
                </Form>)}
           </Formik>

          

           
        </div>
    )
}

export default AuthRegisterForm;