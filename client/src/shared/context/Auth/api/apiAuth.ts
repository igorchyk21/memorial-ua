 import { AuthData, AuthResultType, UserCreateData, UserGeoData } from "@global/types";
import iAxios from "@shared/api/iAxios";

export const apiLoginLocal = async (pData:AuthData): Promise<AuthResultType|null> => {
    try {
        const r = await iAxios.post('auth/local', pData);
        return r.data.isLogin ? r.data : null;
    } catch(e){
        console.error(e);
        return null;
    }

}

export const apiLoginGoogle = async (accessToken:string, cUser:UserGeoData): Promise<AuthResultType|null> => {
    try {
        const r = await iAxios.post('auth/google', {accessToken, ...cUser});
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
    
}

export const apiLogout = async (pData:AuthData): Promise<boolean> => {
    try {
        await iAxios.post('auth/logout', pData);
        return true;
    } catch(e){
        console.error(e);
        return false;
    }
}



export const apiRegisterUser = async (cData:UserCreateData, reToken:string): Promise<boolean|number> => {
    try{
        const r = await iAxios.post('auth/register', {...cData, reToken});
        return r.data.stat || false;
    } catch(e) {
        console.error(e);
        return false;
    }
}