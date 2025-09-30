"use client"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { apiLoginGoogle, apiLoginLocal, apiLogout, apiRegisterUser } from "../api/apiAuth";
import setSessionToken from "../../helper/setSession";
import { apiOtp2Email, apiOtpVerify, apiPasswordChange } from "../api/apiRecoveryPassword";
import { DateTime as DT } from "luxon";
import { API_USERS, AuthRecoveryData, AuthResultType, USER_STATUS, UserGeoData } from "@global/types";
import useIpInfo from "@/shared/hooks/useIpInfo";


export type AuthOpenType = 'login' | 'recovery' | 'register' | null;
export type RecoveryStepType = 'sendOtp'|'verifyOtp'|'changePassword';

export interface AuthContextType { 
    showOffAuth:AuthOpenType;
    setShowOffAuth:Dispatch<SetStateAction<AuthOpenType>>;
    loginLocal: (email:string, login:string)=>Promise<boolean>;
    loginGoogle: (accessToken:string)=>Promise<boolean>;
    auth:AuthResultType|null;
    logout:()=>void;
    recoveryPassword: (rData:AuthRecoveryData, step:RecoveryStepType, reToken:string)=>Promise<boolean>;
    registerUser: (userName:string, userEmail: string, reToken:string)=>Promise<boolean|API_USERS>;
    reFetchUser:()=>void;
    docEditMode:boolean;
}
 
const AuthContextDef = {
    showOffAuth:null,
    setShowOffAuth:()=>{},
    loginLocal: async()=>false,
    loginGoogle: async()=>false,
    auth:null,
    logout:async()=>{},
    recoveryPassword: async()=>false,
    registerUser: async()=>false,
    reFetchUser:()=>{},
    docEditMode:false
}  

export const AuthContext = createContext<AuthContextType>(AuthContextDef);  
export const useAuth = () => useContext(AuthContext);

export const useAuthModel = (authDef?:AuthResultType | null) => {

    const { getIpInfo4User } = useIpInfo();
    const [ showOffAuth, setShowOffAuth ] = useState<AuthOpenType>(null);
    const [ auth, setAuth ] = useState<AuthResultType|null>(authDef||null);
    const [ docEditMode, setDocEditMode ] = useState<boolean>(false);
    // локальна авторизація
    const loginLocal = async (email:string, password:string): Promise<boolean> => {
        const resUser = await apiLoginLocal({email, password});
        if (!resUser?.isLogin) return false;
        setSessionToken(resUser.token);
        setAuth(resUser);
        return true;
    }

    // google авторизація
    const loginGoogle = async (accessToken:string) => {
        const ipInfo = await getIpInfo4User();
        const cUser:UserGeoData = {
            ...ipInfo,
            timeZone: DT.now().zoneName,
            refEmail: localStorage.getItem('refEmail')||''
        }
        const resUser = await apiLoginGoogle(accessToken, cUser);
        if (!resUser?.isLogin) return false;
        setSessionToken(resUser.token);
        setAuth(resUser);
        localStorage.removeItem('refEmail');
        return true;
    }
 
    // автоавторизація через токен
    const loginByJwt = async (token:string): Promise<boolean> => {
        const resUser = await apiLoginLocal({token})  
        // Якщо не пройшла авторизація, або вже немає локального токена 
        if ((!resUser?.token) || (!resUser?.isLogin) || (!localStorage.getItem('authToken'))) return false;
        // if (authDef?.token === resUser.token) return true;
        setSessionToken(resUser.token); 
        setAuth(resUser);
        return true;
    }

    // вилогінення
    const logout = async () =>{
        if (auth?.token) await apiLogout({token:auth?.token});  
        setSessionToken(null);
        setAuth(null);
    }

    // Реєстрація користувача     
    const registerUser = async (userName:string, userEmail:string, reToken:string): Promise<boolean|API_USERS> => {
        const ipInfo = await getIpInfo4User();
        const resCreate = await apiRegisterUser({
            userName, 
            userEmail, 
            userStatus: USER_STATUS.ENABLE , ...ipInfo,
            timeZone: DT.now().zoneName,
            refEmail: localStorage.getItem('refEmail')||''
        }, reToken);

        if (resCreate === true) localStorage.removeItem('refEmail');
        return resCreate;
    } 

    // відновлення пароля 
    const recoveryPassword = async (rData:AuthRecoveryData, step:RecoveryStepType, reToken:string): Promise<boolean> => {
        switch (step) {
            case 'sendOtp': 
                return rData.email ? await apiOtp2Email(rData.email, reToken) : false;
            case 'verifyOtp': 
                return rData.email && rData.otp ? await apiOtpVerify(rData.email, rData.otp, reToken) : false;
            case 'changePassword': 
                return rData.email && rData.otp && rData.password ? await apiPasswordChange(rData.email, rData.otp, rData.password, reToken) : false;
        }
    }

    // отримання користувача по локальному токену
    const reFetchUser = async () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) loginByJwt(authToken);
    }

    useEffect(()=>{
        reFetchUser();
    },[])

     

    return {
        showOffAuth,
        setShowOffAuth,
        recoveryPassword,
        registerUser,
        loginLocal,
        loginGoogle,
        logout,
        auth,
        reFetchUser,
        docEditMode
        
    }
}