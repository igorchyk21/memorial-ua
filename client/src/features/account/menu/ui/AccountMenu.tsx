import { useAuth } from "@/shared/context/Auth";
import { Dropdown, Image } from "react-bootstrap";
import useAccountMenu from "../model/useAccountMenu";

const AccountMenu = () => {
    const { auth, logout } = useAuth();
    const { srcUser,
            srcError,
            handleError,
            handleLoad } = useAccountMenu();
    if (!auth?.user) return null;
    return (
        <Dropdown>
            <Dropdown.Toggle
                className="btn btn-icon fs-lg border-0 rounded-circle animate-shake overflow-hidden">
                    {srcUser &&
                    (<Image 
                        className={srcError ? 'd-none' : ''}
                        onLoad={handleLoad}
                        onError={handleError}
                        src={srcUser||''}/>)}
                    
                    <span
                        className={!srcError ? 'd-none' : ''}
                        style={{paddingTop:4}}>{auth?.user.userName[0]}</span>
                
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>logout()}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default AccountMenu;