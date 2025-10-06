import conf from "@/shared/config/conf";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap"
import useAuthGoogle from "../../login/model/useAuthGoogle";

interface Props {
    disabled?:boolean;
    setSubmitting?:(_:boolean)=>void;
}

const AuthLoginServices = ({disabled=false, setSubmitting}:Props) => {
    const t = useTranslations();
    const { handleGoogleClick } = useAuthGoogle(setSubmitting);
    return (<>
        <div className="d-flex align-items-center my-4"> 
            <hr className="w-100 m-0" />
            <span className="text-body-emphasis fw-medium text-nowrap mx-4">{t('auth.continueWith')}</span>
            <hr className="w-100 m-0" />
        </div>        
        <div className="d-flex flex-column flex-sm-row gap-3 pb-4 mb-3 mb-lg-4">
            <Button 
                size="lg" className="w-100 px-2"
                variant="outline-secondary" 
                disabled={disabled}
                onClick={()=>handleGoogleClick()}>
                <i className={`ci-google ms-1 me-1`} /> Google
            </Button>

            <Button href="/" variant="outline-secondary" disabled size="lg" className="w-100 px-2">
                <i className={`ci-facebook ms-1 me-1`} /> Facebook
            </Button>

            <Button href="/" variant="outline-secondary" disabled size="lg" className="w-100 px-2">
                <i className={`ci-apple ms-1 me-1`} /> Apple
            </Button>
        </div></>)
}

export default AuthLoginServices;