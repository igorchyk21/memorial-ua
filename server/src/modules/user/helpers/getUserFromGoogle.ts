 import { GoogleProfileClaims } from "@global/types";
import axios from "axios";

export const getUserFromGoogle = async (accessToken:string)
    :Promise<GoogleProfileClaims|null> => {

    if (!accessToken) return null;
    
    try {
        const googleRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const profile = googleRes.data;
        return profile;
    } catch(e){
        console.error(e);
        return null;
    }
}