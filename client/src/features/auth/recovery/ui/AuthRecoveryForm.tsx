import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { FormikAuthRegister } from "../../types/auth.types";
import { Button, Form } from "react-bootstrap";
import FormStepOtp from "../../register/ui/FormStepOtp";
import FormStepPassword from "../../register/ui/FormStepPassword";
import useAuthRecovery, { initFormikValue } from "../model/useAuthRecovery";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { useAuth } from "@/shared/context/Auth";
import FormStepUserName from "../../register/ui/FormStepUserName";
import FormStepRecFinish from "./FormStepRecFinish";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";

const AuthRecoveryForm = () => {
    const t = useTranslations();
    const { setShowOffAuth } = useAuth();
    const { recoveryStep, 
            setRecoveryStep,
            handleSubmit } = useAuthRecovery();
    return  (
        <>
        <h1 className="h2 mt-auto">{t('auth.forgotAccount')}</h1>
        <p className="pb-2 pb-md-3">
          {t('auth.forgotAccountInfo')}
        </p> 
 
        
        <Formik<FormikAuthRegister> initialValues={initFormikValue} onSubmit={handleSubmit}> 
            {(formik)=>(
                <Form onSubmit={formik.handleSubmit}>
                    
                    {recoveryStep == 1 &&
                        (<FormStepUserName 
                            userNameShow={false}
                            showPrivacy={false} />)}

                    {recoveryStep == 2 &&
                        (<FormStepOtp/>)} 

                    {recoveryStep == 3 &&
                        (<FormStepPassword/>)}


                    {recoveryStep <= 3 &&
                    (<><Button type="submit" size="lg" 
                        className="w-100"
                        disabled={formik.isSubmitting}> 
                        <SpinnerTitle 
                            showSpinner={formik.isSubmitting}
                            titleButton={t(recoveryStep<3 ? 'buttons.continue' : 'buttons.finish')}/>
                    </Button>

                        
                    <span className="d-block text-center mt-4 p-0 ms-2 animate-underline cursor-pointer">
                        <span className={`animate-target ${formik.isSubmitting ? 'd-none': ''}`}
                            onClick={(e)=>{
                                recoveryStep > 1
                                    ? setRecoveryStep(prev=>prev-1)
                                    : setShowOffAuth('login')}}>
                                <i className="bi bi-arrow-left me-1"></i> {t('buttons.back')}</span>
                    </span></>)}

                    {recoveryStep === 4 &&
                        (<FormStepRecFinish disabled={formik.isSubmitting}/>)}
            </Form>)}
        </Formik>
        
        </>)
} 

export default AuthRecoveryForm;