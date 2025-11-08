"use client"
import { CommonComponentChildren } from "@/types";
import { AuthContext, useAuthModel } from "./model/useAuth"
import { AuthResultType } from "@global/types"; 
 
interface AuthProviderProps extends CommonComponentChildren{ 
    authDef?:AuthResultType | null;
}

export const AuthProvider = ({children, authDef}:AuthProviderProps) => {
    const  { showOffAuth,
            setShowOffAuth,
            recoveryPassword,
            registerUser,
            loginLocal,
            loginGoogle,
            auth,
            docEditMode,
            reFetchUser,
            logout} = useAuthModel(authDef);

    return ( 
        <AuthContext.Provider
            value={{
                showOffAuth,
                setShowOffAuth,
                loginLocal,
                loginGoogle,
                recoveryPassword,
                registerUser,
                auth,
                docEditMode,
                reFetchUser,
                logout 
            }}>
            {children}
        </AuthContext.Provider>
    )
}