import { notificationList, notificationMarkAsRead } from "@/entities/notification";
import conf from "@/shared/config/conf";
import { NotificationItemType } from "@global/types";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { NotificationGroup } from "../type/notification.type";



const useNotificationList = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const [ fetching, setFetching ] = useState<boolean>(false);
    const [ isReading, setIsReading ] = useState<number|null>(null);
    const [ list, setList ] = useState<NotificationItemType[]>([]);

    const fetchNotificationList = async () => {
        setFetching(true);
        const list = await notificationList();
        setList(list || []);
        setFetching(false);
         
    }    

    const markAsRead = async (item: NotificationItemType) => {
        setIsReading(item.ID);
        const res = await notificationMarkAsRead(item.ID);
        const list = await notificationList();
        setList(list || []);
        if (!res) showToast(t('error'),'danger')
        setIsReading(null);
    }
    
    const groups = useMemo<NotificationGroup[]>(() => {
        if (!list || list.length === 0) return [];

        const map = new Map<number, NotificationGroup>();

        list.forEach((rawItem) => {
            const heroId = rawItem.heroId

            if (!heroId) return;

            const heroName = `${rawItem.heroFName} ${rawItem.heroLName}`;

            const heroPhoto: string | null =
                rawItem.heroPhoto ?? rawItem.heroPhoto ?? null;

            const heroUrl = `${conf.domain}/hero/${rawItem.heroUrl}-${heroId}`

            const existing = map.get(heroId);

            if (existing) {
                existing.items.push(rawItem as NotificationItemType);
            } else {
                map.set(heroId, {
                    heroId,
                    heroName,
                    heroPhoto,
                    heroUrl,
                    items: [rawItem as NotificationItemType],
                });
            }
        });

        return Array.from(map.values());
    }, [list]);


    useEffect(()=>{
        fetchNotificationList();
    },[])

    return {
        fetching,
        list,
        groups,
        markAsRead,
        isReading,
    }
}

export default useNotificationList;