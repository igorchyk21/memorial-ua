import iAxios from "@/shared/api/iAxios";
import { NotificationItemType } from "@global/types";

export const apiNotificationList = async (): Promise<NotificationItemType[]|null> => {
    try {
        const r = await iAxios.get('/notification/list');
        return r.data.items || null;
    } catch(e){
        console.error(e); 
        return null;
    }
}

export const apiNotificationMarkAsRead = async (itemId: number): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/notification/read/${itemId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}