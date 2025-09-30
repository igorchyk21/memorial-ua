import { useTranslations } from "next-intl"
import { Button } from "react-bootstrap";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { useAuth } from "@/shared/context/Auth";

interface Props {
    disabled?:boolean
}

const FormStepRecFinish = ({disabled=false}:Props) => {
    const t = useTranslations();
    const { setShowOffAuth } = useAuth();
    return (
        <div className="text-center p-2">
            <i className="ci-check-shield mb-4" style={{fontSize:48}}/>
            <h3 className="mb-5">{t('auth.recoverySuccess')}</h3>
            <Button type="submit" size="lg" 
                className="w-100"
                disabled={disabled}>
                <SpinnerTitle 
                    showSpinner={disabled}
                    titleButton={t('auth.login')}/>
            </Button>   
            <span className="d-block text-center mt-4 p-0 ms-2 animate-underline cursor-pointer">
                <span className="animate-target"
                    onClick={(e)=>setShowOffAuth('login')}>
                        <i className="bi bi-arrow-left me-1"></i> {t('buttons.back')}</span>
            </span>                 
        </div>
    )
} 

export default FormStepRecFinish;