
export enum NOTIFICATION_TYPE {
    HERO_CREATED = 1,
    POST_CREATED = 2,
    PHOTO_UPLOADED = 3,
    VIDEO_ADD = 4,
    AUDIO_ADD = 5,
    CANDLE_FREE = 6,
    CANDLE_PAID = 7,
}

export interface NotificationItemType {
    ID:number;
    type:NOTIFICATION_TYPE;
    userId:number;
    heroId:number;
    dt:number;
    readDt:number;
    readUserId:number;
    heroFName:string;
    heroLName:string;
    heroMName:string;
    heroPhoto:string;
    heroUrl:string;
}