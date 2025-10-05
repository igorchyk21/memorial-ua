import { useAuth } from "@/shared/context/Auth";
import { useEffect, useState } from "react";

const useAccountMenu = () => {

    const { auth } = useAuth();
    const [ srcUser, setSrcUser ] = useState<string|null>(null);
    const [ srcError, setSrcError ] = useState(true);

    const handleError = () => {
        setSrcError(true);
    }

    const handleLoad = () => {
        setSrcError(false);
    }

    useEffect(()=>{
        if (auth?.user.userPicture) {
            setSrcUser(auth?.user.userPicture);
        }
    },[auth?.user.userPicture])

    return {
        srcUser,
        handleError,
        handleLoad,
        srcError
    }
}

export default useAccountMenu;