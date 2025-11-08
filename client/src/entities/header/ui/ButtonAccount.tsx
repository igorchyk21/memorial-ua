import { useAuth } from "@/shared/context/Auth";
import { Button } from "react-bootstrap"



const ButtonAccount = () => {
    const { setShowOffAuth } = useAuth();
    return ( 
        <Button 
            onClick={()=>setShowOffAuth('login')}
            className="btn btn-icon fs-lg border-0 rounded-circle animate-shake ">
            <i className="ci-user animate-target" />
        </Button>)
}

export default ButtonAccount;
