import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { Button, Form, Nav, NavLink } from "react-bootstrap";
import AuthLoginServices from "../../shared/ui/AuthLoginServices";
import { useAuth } from "@/shared/context/Auth";
import useAuthLogin from "../model/useAuthLogin";
import { Field, Formik } from "formik";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import conf from "@/shared/config/conf";
import { AuthData } from "@global/types";

const AuthLoginForm = () => {

    const  t  = useTranslations();
    const { setShowOffAuth } = useAuth();    
    

    const { validated,
            handleSubmit } = useAuthLogin();
      
    return  (
        <div className="h-100 d-flex flex-column">
            {/* Title + text */}
            <h2 className="h2">{t('auth.welcome')}</h2>
            <Nav className="fs-sm mb-4">
                {t('auth.welcomeInfo')}
                <NavLink as="span" 
                    className="p-0 ms-2 animate-underline cursor-pointer"
                    onClick={()=>setShowOffAuth('register')}>
                    <a className="text-underline text-body-emphasis">{t('auth.createAccount')}</a>
                </NavLink>
            </Nav>

            <Formik<AuthData> initialValues={{email:'', password:''}} onSubmit={handleSubmit}>
            {(formik)=>(
            <Form onSubmit={formik.handleSubmit}>
                
                <div className="position-relative mb-3">
                    <Form.Label className="mb-0">{t('auth.loginLabel')}</Form.Label>
                    <Field className="form-control form-control-lg"
                        name="email" 
                        type="email"
                        disabled={formik.isSubmitting}
                        placeholder={t('auth.loginPlaceholder')}  
                        required 
                        autoFocus/>
                     
                </div>

                <div className="mb-4">
                    <Form.Label className="mb-0">{t('auth.password')}</Form.Label>
                    <Field className="form-control form-control-lg"
                        name="password" 
                        type="password" 
                        disabled={formik.isSubmitting}
                        placeholder={t('auth.passwordPlaceholder')}  
                        required/>                    
                    
                    
                </div>
            
                <div className="d-flex align-items-center justify-content-end mb-4">
                    <Nav >
                    <Nav.Link as="span" className="animate-underline p-0 cursor-pointer">
                        <a className="text-underline text-body-emphasis"
                            onClick={()=>setShowOffAuth('recovery')}>{t('auth.forgotAccount')}</a>
                    </Nav.Link>
                    </Nav>
                </div>

                <Button type="submit" size="lg" 
                    className="w-100"
                    disabled={formik.isSubmitting}>
                    <SpinnerTitle 
                        showSpinner={formik.isSubmitting}
                        titleButton={t('auth.signIn')}/>
                </Button>

                <GoogleOAuthProvider clientId={conf.authGoogleId}>
                    <AuthLoginServices 
                        setSubmitting={formik.setSubmitting}
                        disabled={formik.isSubmitting}/>    
                </GoogleOAuthProvider>

            </Form>
            
            )}
            
            
            </Formik>

            
            
        </div>)
}

export default AuthLoginForm;