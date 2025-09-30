import { Field, useFormikContext } from "formik";
import { useLocale, useTranslations } from "next-intl"
import { Form } from "react-bootstrap"
import { FormikAuthRegister } from "../../types/auth.types";
import Link from "next/link";
import CheckLockForm from "@/shared/ui/forms/CheckLockForm";

interface Props {
    userNameShow?:boolean;
    showPrivacy?:boolean;
}

const FormStepUserName = ({userNameShow=true, showPrivacy=true}:Props) => {
    const t = useTranslations();
    const locale = useLocale();
    const { isSubmitting } = useFormikContext<FormikAuthRegister>();
    return ( 
        <div> 
            {userNameShow &&
            (<div className="position-relative mb-3">
                <Form.Label className="mb-0">{t('auth.userName')}</Form.Label>
                <Field className="form-control form-control-lg"
                    name="userName" 
                    type="text" 
                    disabled={isSubmitting}
                    placeholder={t('auth.userNamePlaceholder')} 
                    required
                    autoFocus/>                      
            </div>)}

            <div className="mb-4">                
                <Form.Label className="mb-0">{t('auth.loginLabel')}</Form.Label>
                <Field className="form-control form-control-lg"
                    name="userEmail" 
                    type="email" 
                    disabled={isSubmitting}
                    placeholder={t('auth.loginPlaceholder')} 
                    required
                    autoFocus={!userNameShow}/>  
                
            </div>

            {showPrivacy &&
            (<div className="d-flex flex-column gap-2 mb-4">
                <CheckLockForm/>
            </div>)}
        </div>)
}

export default FormStepUserName