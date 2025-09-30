import { Field, useFormikContext } from "formik";
import { useTranslations } from "next-intl"
import { Form } from "react-bootstrap"
import { FormikAuthRegister } from "../../types/auth.types";
 
const FormStepPassword = () => {
    const t = useTranslations();
    const { isSubmitting } = useFormikContext<FormikAuthRegister>();
    
    return (
        <div>
            <div className="mb-4">
                <Form.Label className="mb-0">{t('auth.password')}</Form.Label>
                <Field className="form-control form-control-lg"
                    name="password1" 
                    type="password"  
                    disabled={isSubmitting}
                    placeholder={t('auth.passwordPlaceholder')} 
                    required
                    autoFocus/>  
            </div>                

            <div className="mb-4">
                <Form.Label className="mb-0">{t('auth.rePassword')}</Form.Label>
                <Field className="form-control form-control-lg"
                    name="password2" 
                    type="password"  
                    disabled={isSubmitting}
                    placeholder={t('auth.rePasswordPlaceholder')} 
                    required/>                  
            </div>  
        </div>)
}

export default FormStepPassword