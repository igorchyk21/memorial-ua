import conf from "@/shared/config/conf";
import { CommonComponentChildren } from "@/types";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptcha = ({children}:CommonComponentChildren) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={conf.recapthaId}>
            {children}
        </GoogleReCaptchaProvider>)
}

export default ReCaptcha;