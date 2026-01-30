"use client"
import { Offcanvas } from "react-bootstrap";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useAuth } from "@/shared/context/Auth/model/useAuth";
import { useTranslations } from "next-intl";
import { NotificationList } from "@/features/notification";
const NotificationWidget = () => {

    const { auth } = useAuth();
    const { notificationShow, setNotificationShow } = useGlobal();
    const t = useTranslations();
    if (!auth?.user.admin) return null;
    return (
        <Offcanvas 
            show={notificationShow} 
            onHide={()=>setNotificationShow(false)}
            scroll
            placement="end"
            style={{width:500}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{t('notification.title')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <NotificationList/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default NotificationWidget;