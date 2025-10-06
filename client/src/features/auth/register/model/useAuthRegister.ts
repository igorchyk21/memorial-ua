import { delay } from "motion";
import { useState } from "react"
import { FormikAuthRegister } from "../../types/auth.types";
import { AuthRecoveryData } from "@emeet/types";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAuth } from "@/shared/context/Auth";
import { API_USERS } from "@/types/emeetEnums";
import { useTranslations } from "next-intl";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { FormikHelpers } from "formik";
import { RecoveryStepType } from "@/shared/context/Auth/model/useAuth";
import { validateNewPassword } from "../../helper/validateNewPassword";

export const initFormikValue = {
    userName:'',
    userEmail:'',
    otp:'',
    password1:'',
    password2:''
}  

const step2Type: RecoveryStepType[] = ['sendOtp','verifyOtp','changePassword'];
  
const useAuthRegister = () => {
    
    const t = useTranslations();
    const { showToast } = useToast();
    const { registerUser, recoveryPassword, loginLocal, setShowOffAuth } = useAuth();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [ registerStep, setRegisterStep ] = useState(1);
    const [ retryOtp, setRetryOtp ] = useState(1);

    const handleSubmit = (async (values:FormikAuthRegister, action: FormikHelpers<FormikAuthRegister> )=>{
        
        if (!values.userName) return false;

        // Останній етап - автоматична авторизація 
        if (registerStep === 4) {
            const login = await loginLocal(values.userEmail||'', values.password1||'')
            if (!login) return showToast(t('auth.errors.login'),'danger');
            showToast(t('auth.mess.loginSuccess'),'success');
            setShowOffAuth(null);
            return;
        }
        
        // Перевіряємо парольна 3 етапі
        if (registerStep === 3) {
            let error = validateNewPassword(values.password1, values.password2)
            if (error) return showToast(t(error),'danger');
        }
 
        // перевіряємо коректність ОТП
        if ((registerStep === 2) && (values.otp.length !== 4))
            return showToast(t('auth.errors.otpLength'), 'danger');


        // Реэстрація
        if (registerStep === 1) {
            const reToken = executeRecaptcha ? await executeRecaptcha("submit_form") : ''
            const resRegister = await registerUser(values.userName, values.userEmail, reToken)
            if (resRegister === API_USERS.USER_EXISTS) return showToast(t('auth.errors.userAlreadyExists'), 'danger');
            if (resRegister === API_USERS.USER_BLOCK) return showToast(t('auth.errors.userBlock'), 'danger');
            if (resRegister === API_USERS.USER_WRONG_EMAIL) return showToast(t('auth.errors.emailWrong'), 'danger');
            if (resRegister === false) return showToast(t('errors.common'), 'danger');
            setRegisterStep(prev=>prev+1) 
            
        // Створення пароля (2 та 3 етапи)
        } else {  

            const reToken = executeRecaptcha ? await executeRecaptcha("submit_form") : '';
            const rData:AuthRecoveryData = {
                        otp:values.otp,
                        email:values.userEmail,
                        password:values.password1
                    };

            const resRecovery = await recoveryPassword(rData, step2Type[registerStep-1],reToken) 
            if (resRecovery)
                setRegisterStep(prev=>prev+1) 

            else {
                if (registerStep == 1) return showToast(t('auth.errors.otpSend'),'danger');
                if (registerStep == 2) {
                    action.setFieldValue('otp','');
                    showToast(t('auth.errors.otpError'),'danger');
                    if (retryOtp>=3) {
                        setRegisterStep(1);
                        showToast(t('auth.mess.tryAgain'),'primary');
                    }
                        else setRetryOtp(prev=>prev+1);
                }
            }                    
        }
    })

    return { 
        registerStep, 
        setRegisterStep,
        handleSubmit
    }
}

export default useAuthRegister;