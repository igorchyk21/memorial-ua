import iAxios from "@shared/api/iAxios";
import Cookies from "js-cookie";


const setSessionToken = (authToken:string|null) => {
    if (authToken) {
        localStorage.setItem('authToken', authToken);
        iAxios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        Cookies.set("authToken", authToken, { 
            expires: 7, 
            secure: true, 
            sameSite: "strict" 
        });
    } else { 
        localStorage.removeItem('authToken');
        delete iAxios.defaults.headers.common.Authorization;
        Cookies.remove("authToken");
    }
};

export default setSessionToken;