import { NOTIFICATION_TYPE, NotificationItemType } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

    
let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// створення нотифікації
const createNotification = async (heroId:number, userId:number, type:NOTIFICATION_TYPE)
    :Promise<boolean> => {

    const sql = `
        INSERT INTO notifications (dt, hero_id, user_id, type)
        VALUES (?, ?, ?, ?)
    `;
    
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [Date.now(), heroId, userId, type]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

// отримання списку нотифікацій
const getNotifications = async ()
    :Promise<NotificationItemType[]|null> => {
    const sql = `
        SELECT  
                notifications.ID        as ID,
                notifications.dt        as dt,
                notifications.hero_id   as heroId,
                notifications.user_id   as userId,
                notifications.type      as type,
                notifications.read_dt   as readDt,
                notifications.read_user_id as readUserId,
                heroes.hero_fname       as heroFName,
                heroes.hero_lname       as heroLName,
                heroes.hero_mname       as heroMName,
                heroes.hero_url         as heroUrl,
                heroes.hero_photo       as heroPhoto
        FROM    notifications, heroes
        WHERE   notifications.read_dt = 0
        AND     notifications.hero_id = heroes.ID
        ORDER   BY notifications.dt DESC
    `;
    try {
        const [r] = await conn.execute<(RowDataPacket & NotificationItemType)[]>(sql);
        return r;
    } catch(e){
        console.error(e);
        return [];
    }
}

// позначення нотифікації як прочитаної
const markAsRead = async (notificationId:number, userId:number)
    :Promise<boolean> => {
    const sql = `
        UPDATE notifications SET read_dt = ?, read_user_id = ? WHERE ID = ?
    `;
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [Date.now(), userId, notificationId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

export default {
    setConn,
    createNotification,
    getNotifications,
    markAsRead
}

