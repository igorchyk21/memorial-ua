import { useAuth } from "@/shared/context/Auth";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useEffect, useState } from "react";

const useAccountMenu = () => {

    const { auth } = useAuth();
    const [ srcUser, setSrcUser ] = useState<string|null>(null);
    const [ srcError, setSrcError ] = useState(true);
    const [ update, setUpdate ] = useQueryState<string>('update');
 
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
        srcError,
        setUpdate
    }
}

export default useAccountMenu;