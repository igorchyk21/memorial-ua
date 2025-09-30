import { useEffect, useState } from "react"
import { FormikAuthRegister } from "../../types/auth.types";
import { useAuth } from "@/shared/context/Auth";
import { RecoveryStepType } from "@/shared/context/Auth/model/useAuth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useTranslations } from "next-intl";
import { AuthRecoveryData } from "@emeet/types";
import { FormikHelpers } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { validateNewPassword } from "../../helper/validateNewPassword";

export const initFormikValue = {
    userEmail:'',
    otp:'',
    password1:'',
    password2:''
} 
const step2Type: RecoveryStepType[] = ['sendOtp','verifyOtp','changePassword'];
const useAuthRecovery = () => {

    const t  = useTranslations();
    const { recoveryPassword, setShowOffAuth, loginLocal } = useAuth();
    const { showToast } = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [ recoveryStep, setRecoveryStep ] = useState(1);
    const [ retryOtp, setRetryOtp ] = useState(1);
    
    const handleSubmit = (async (values:FormikAuthRegister, action: FormikHelpers<FormikAuthRegister> )=>{
       

        // Останній етап - автоматична авторизація 
        if (recoveryStep === 4) {
            const login = await loginLocal(values.userEmail||'', values.password1||'')
            if (!login) return showToast(t('auth.errors.login'),'danger');
            showToast(t('auth.mess.loginSuccess'),'success');
            setShowOffAuth(null);
            return;
        }        

        // Перевіряємо парольна 3 етапі
        if (recoveryStep === 3) {
            let error = validateNewPassword(values.password1, values.password2)
            if (error) return showToast(t(error),'danger');
        }
 
        if ((recoveryStep === 2) && (values.otp.length !== 4))
            return showToast(t('auth.errors.otpLength'), 'danger');
        
        const reToken = executeRecaptcha ? await executeRecaptcha("submit_form") : '';
        const rData:AuthRecoveryData = {
            otp:values.otp,
            email:values.userEmail,
            password:values.password1,
            
        } 

        const resRecovery = await recoveryPassword(rData, step2Type[recoveryStep-1],reToken) 
        if (resRecovery)
            setRecoveryStep(prev=>prev+1) 

        else {
            if (recoveryStep == 1) return showToast(t('auth.errors.otpSend'),'danger');
            if (recoveryStep == 2) {
                action.setFieldValue('otp','');
                showToast(t('auth.errors.otpError'),'danger');
                if (retryOtp>=3) {
                    setRecoveryStep(1);
                    showToast(t('auth.mess.tryAgain'),'primary');
                }
                    else setRetryOtp(prev=>prev+1);
            }
        }
    });

    

    useEffect(()=>{
        if (recoveryStep==1) setRetryOtp(1)
    }, [recoveryStep])

    return { 
        recoveryStep, 
        setRecoveryStep,
        handleSubmit
    }
}

export default useAuthRecovery;