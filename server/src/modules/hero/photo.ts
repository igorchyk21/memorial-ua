import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

const get = async (heroId:number)
    : Promise<HeroPhotoItem[]|null> => {

    const sql = `
        SELECT  heroes_photos.ID                    as ID,
                heroes_photos.hero_id               as heroId,
                heroes_photos.user_id               as userId,
                heroes_photos.upload_dt             as uploadDt,
                heroes_photos.photo_url             as url,
                heroes_photos.photo_description     as description,
                heroes_photos.photo_status          as status,
                users.user_name                     as userName,
                users.user_picture                  as userPicture 
        FROM    heroes_photos
        LEFT    JOIN users ON users.ID = heroes_photos.user_id
        WHERE   heroes_photos.hero_id = ?
        AND     heroes_photos.deleted = 0`;

    try { 
        const [r] = await conn.execute<(RowDataPacket & HeroPhotoItem)[]>(sql, [heroId])
        return r;
    } catch(e){
        console.error(e);
        return null;
    }

}

// Додаємємо фото Героя
const add = async (heroId: number, userId:number, photos:string[], photoStatus=HERO_PHOTO_STAT.PENDING) 
    : Promise<boolean> => {

    const sql = `
        INSERT  INTO heroes_photos
                (hero_id, user_id, upload_dt, photo_url, photo_status)
        VALUES  (?,?,?,?,?)`;

    let res = true;
    try {
        for (const photo of photos) {
            const params = [heroId, userId, Date.now(), photo, photoStatus];
            const [r] = await conn.execute<ResultSetHeader>(sql, params);
            if (r.affectedRows !== 1) res = false;
        }
        return res;
    } catch(e){
        console.error(e);
        return false;
    } 
}


const sorted = async (heroId:number, sortedIds:number[]) => {
    const sql = `
        UPDATE heroes_photos SET photo_ord = ? WHERE ID = ? AND hero_id = ?`

    try {
        for(let i=0; i<sortedIds.length; i++) {
            await conn.execute(sql, [i, sortedIds[i], heroId]);
        }
        return true;
    } catch(e){
        console.error(e);
        return false;
    }
}





export default {
    setConn,
    get,
    add,
    sorted
}