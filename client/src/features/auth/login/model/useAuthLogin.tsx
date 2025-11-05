import { useAuth } from "@/shared/context/Auth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { AuthData } from "@global/types";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react"

const useAuthLogin = () => {

    const t = useTranslations();
    const { loginLocal, setShowOffAuth } = useAuth();
    const { showToast } = useToast();
    const [ validated, setValidated] = useState(false);
    const [ update, setUpdate ] = useQueryState<string>('update');

    const handleSubmit = async (values:AuthData) => {
        const login = await loginLocal(values.email||'', values.password||'')
        if (!login) return showToast(t('auth.errors.login'),'danger');
        setShowOffAuth(null);
        setUpdate(Date.now().toString());
        showToast(t('auth.mess.loginSuccess'),'success');
    } 
 
    return {
        validated,
        handleSubmit
    }
}

export default useAuthLogin;