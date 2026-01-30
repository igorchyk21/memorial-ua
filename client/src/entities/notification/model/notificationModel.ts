import { NotificationItemType } from "@global/types";
import { apiNotificationList, apiNotificationMarkAsRead } from "../api/notification.api";

export const notificationList = async (): Promise<NotificationItemType[]|null> => {
    return await apiNotificationList();
}

export const notificationMarkAsRead = async (itemId: number): Promise<boolean> => {
    return await apiNotificationMarkAsRead(itemId);
}   