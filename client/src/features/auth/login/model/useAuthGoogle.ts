import { useAuth } from "@/shared/context/Auth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";

const useAuthGoogle = (setSubmitting?:(_:boolean)=>void) =>{ 

    const t = useTranslations();
    const { showToast } = useToast();
    const { loginGoogle, setShowOffAuth } = useAuth();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const success = async (tokenResponse: TokenResponse) => {
        if (setSubmitting) setSubmitting(true);
        const login =  await loginGoogle(tokenResponse.access_token);   
        if (setSubmitting) setSubmitting(false);
        if (!login) return showToast(t('auth.errors.login'),'danger');

        setShowOffAuth(null);
        setUpdate(Date.now().toString());
        showToast(t('auth.mess.loginSuccess'),'success');
        
    }

    const handleGoogleClick = useGoogleLogin({
        onSuccess: async (tokenResponse: TokenResponse) => {
            success(tokenResponse);
        },
        onError: () => console.log("Login Failed"),
        flow: "implicit", // або 'auth-code', якщо потрібно
    });

    return {
        handleGoogleClick
    }
}

export default useAuthGoogle;