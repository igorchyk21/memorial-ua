import aAxios from "@shared/api/iAxios";
 
// Відправка ОТП пароля 
export const apiOtp2Email = async (email:string, reToken:string): Promise<boolean> => {
    try {
        const pData = {
            email : email,
            reToken
        }
        const resOtp = await aAxios.post('auth/otp/send', {...pData, reToken});
        return resOtp.data.otp;
    } catch(e) {
        console.log(e);
        return false;
    } 
}

// Перевірка ОТП пароля
export const apiOtpVerify = async (email:string, otp:string, reToken:string): Promise<boolean> => {
    try {
        const pData = {
            email   : email,
            otp     : otp,
            reToken
        }
        const resOtp = await aAxios.post('auth/otp/verify', {...pData, reToken});
        return resOtp.data.verify
    } catch(e) {
        console.log(e);
        return false;
    } 
}

// Зміна пароля користувача
export const apiPasswordChange = async (email:string, otp:string, password:string, reToken:string): Promise<boolean> => {
    try {
        const pData = {
            email   : email,
            otp     : otp,
            password: password,
            reToken
        }
        const resChanged = await aAxios.post('auth/password/change', {...pData, reToken});
        return resChanged.data.changed;
    } catch(e) {
        console.log(e);
        return false;
    } 
}

// Перевірка пароля на коректність 
export const passwordVerify = (p1:string,p2:string) => {
    if (p1 !== p2) return 'passError';
    return true;
}