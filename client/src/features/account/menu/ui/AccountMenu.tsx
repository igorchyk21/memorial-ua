import { useAuth } from "@/shared/context/Auth";
import { Dropdown, Image, Spinner } from "react-bootstrap";
import useAccountMenu from "../model/useAccountMenu";
import { useState } from "react";
import { useTranslations } from "next-intl";

const AccountMenu = () => {

    const t = useTranslations();
    const { auth, logout } = useAuth();
    const { srcUser,
            srcError,
            handleError,
            handleLoad,
            setUpdate } = useAccountMenu();
    
    const [ spinner, setSpinner ] = useState(false);

    if (!auth?.user) return null;
    return (
        <Dropdown>
            <Dropdown.Toggle
                disabled={spinner}
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
                    
                    {spinner  &&
                    (<div className="position-absolute">
                        <Spinner style={{height:16, width:16}}/>
                    </div>)}
            </Dropdown.Toggle>

            <Dropdown.Menu> 
                <Dropdown.Item onClick={async ()=>{
                    setSpinner(true);
                    await logout();
                    setSpinner(false);
                    setUpdate(Date.now().toString());
                }}>
                    {t('auth.logout')}
                </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    )
}

export default AccountMenu;