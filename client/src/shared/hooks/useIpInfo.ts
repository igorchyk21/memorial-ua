import { UserGeoData } from "@global/types";

const useIpInfo = () => {

    const getIpInfo4User = async (): Promise<UserGeoData|null> => {
        try {
            const resLocation = await fetch("https://ipinfo.io/json");  
            const jsonLocation = await resLocation.json(); 
            const res: UserGeoData = {
                geoIp:jsonLocation?.ip,
                geoIso:jsonLocation?.country,
                geoCountry:jsonLocation?.country,
                geoCity:jsonLocation?.city
            }
            return res;
        } catch(e){
            console.error(e);
            return null;
        }
    }

    return {
        getIpInfo4User
    };
    
}

export default useIpInfo;