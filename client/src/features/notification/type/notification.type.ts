import { NotificationItemType } from "@global/types";

export type NotificationGroup = {
    heroId: number;
    heroName: string;
    heroPhoto?: string | null;
    heroUrl?: string | null;
    items: NotificationItemType[];
};
