import { useAuth } from "@/shared/context/Auth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { AuthData } from "@emeet/types";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react"

const useAuthLogin = () => {

    const t = useTranslations();
    const [validated, setValidated] = useState(false);
    const { loginLocal, setShowOffAuth } = useAuth();
    const { showToast } = useToast();
    const handleSubmit = async (values:AuthData) => {
        
        const login = await loginLocal(values.email||'', values.password||'')
        if (!login) return showToast(t('auth.errors.login'),'danger');
        
        showToast(t('auth.mess.loginSuccess'),'success');
        setShowOffAuth(null);
    } 

    return {
        validated,
        handleSubmit
    }
}

export default useAuthLogin;