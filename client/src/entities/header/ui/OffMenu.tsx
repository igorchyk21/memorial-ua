import { Dispatch, SetStateAction } from "react";
import { Offcanvas } from "react-bootstrap";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { menuItems } from "../const/menuItems";

interface Props  {
    show:boolean;
    setShow:Dispatch<SetStateAction<boolean>>;
}
 
const OffMenu = ({show, setShow}:Props) => {
    const t = useTranslations();
    return (
        <Offcanvas
            show={show}
            onHide={()=>setShow(false)}
            scroll>
        <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title as="h5" className="align-items-top" >
                {t('mainMenu.title')}
            </Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body className="pt-3">
                <div className="h6 fw-medium py-1 mb-0">
                    {menuItems.map((item,i)=>{
                        return (<div key={i}>
                            {item.title === null ? (<hr/>)
                            :(
                                <Link className="d-block animate-underline py-1" 
                                    href={item.href}
                                    onClick={()=>setShow(false)}>
                                    <span className="d-inline-block animate-target py-1">{t(`mainMenu.items.${item.title}`)}</span>
                                </Link>
                            )}
                        </div>)
                    })}
                </div>
            </Offcanvas.Body>
            <div className="p-3">
                <Link
                    href="/heroes"
                    onClick={()=>setShow(false)}
                    className="btn btn-primary btn-lg rounded-pill w-100">
                    {t('buttons.showAllHeroes')}
                </Link>
            </div>
        </Offcanvas>
    )
}

export default OffMenu;