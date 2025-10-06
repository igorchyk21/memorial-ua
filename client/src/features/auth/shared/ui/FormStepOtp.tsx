import OtpInput4 from "@/shared/ui/forms/OtpInput4";
import { useFormikContext } from "formik";
import { useTranslations } from "next-intl"
import { Form } from "react-bootstrap"
import { FormikAuthRegister } from "../../types/auth.types";
 
const FormStepOtp = () => {
    const t = useTranslations();
    const { isSubmitting, setFieldValue, values} = useFormikContext<FormikAuthRegister>();
    
    return ( 
        <div>
             <div className="mb-4">
                <Form.Label className="mb-0 mb-2">{t('auth.otpLabel')}</Form.Label>
                <OtpInput4 value={values.otp||''} 
                    onChange={(code)=>setFieldValue('otp', code)}
                    disabled={isSubmitting}/>
            </div>
        </div>)
}

export default FormStepOtp;