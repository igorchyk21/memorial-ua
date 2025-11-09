import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { safeIntParse } from "../helpers/gim-beckend-helpers.js";
import fs from "fs/promises";
import path from "path";
import conf from "../../config/conf.js";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { deleteFile } from "../helpers/files/files.js";

const PROGILEPHOTOWIDTH     = 600;

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

sharp.cache(false);

const get = async (heroId:number|null, photoId?:number)
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
        WHERE   ${photoId ? 'heroes_photos.ID = ?' : 'heroes_photos.hero_id = ?'}
        AND     heroes_photos.deleted = 0
        ORDER   BY photo_ord, ID DESC`;

    try { 
        const [r] = await conn.execute<(RowDataPacket & HeroPhotoItem)[]>(sql, [photoId ? photoId : heroId])
        return r;
    } catch(e){
        console.error(e);
        return null;
    }

}

const getAboutPhoto = async (heroId:number)
    : Promise<string|null> => {

    const sql = `SELECT hero_photo FROM heroes WHERE ID = ?`;
    try {
        const [r]:any = await conn.execute(sql,[heroId]);
        return r?.[0]?.hero_photo || null;
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


const setStatus = async (photoId:number, photoStatus:HERO_PHOTO_STAT)
    : Promise<boolean> => {

    const sql = `
        UPDATE  heroes_photos
        SET     photo_status = ?
        WHERE   ID = ?
    `;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql,[photoStatus, photoId]);
        return r.affectedRows === 1;
    }  catch(e) {
        console.error(e);
        return false;
    }
}

export const deletePhoto = async (photoId:number, userId:number)
    : Promise<boolean> => {
    

    const photo = await get(null, photoId);
    if (!photo?.[0]) return false;
    console.log(photo)
    const where = ` 
        WHERE   ID = ${safeIntParse(photoId)} 
                ${typeof userId !== 'undefined' ? `AND user_id = ${safeIntParse(userId)}` : '' }`;

    const sql = `DELETE FROM heroes_photos ${where}`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql);
        await deleteFile(photo?.[0].url);
        return r.affectedRows  === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

// зміна фотографії профіля
const setMainPhoto = async (heroId:number, imgData:string): Promise<boolean> => {
    try {
        const fileName  = `${uuidv4()}.webp`;
        const path4file = path.join(conf.dataFolder, 'heroes', heroId.toString(), fileName);
        const dir4file = path.join(conf.dataFolder, 'heroes', heroId.toString());
        await fs.mkdir(dir4file, { recursive: true });
        /**
         * Видаляємо префікс `data:image/png;base64,` К
         * Конвертуємо Base64 у Buffer
         * Обробляємо зображення через sharp
         **/ 
        imgData = imgData.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(imgData, "base64");
        await sharp(imageBuffer)
            .resize({ width: PROGILEPHOTOWIDTH }) 
            .toFormat("webp")
            .toFile(path4file); 

        // видаляємо старе фото 
        const oldPhoto = await getAboutPhoto(heroId);
        if (oldPhoto) 
            deleteFile(oldPhoto);
 
        
        // Зберыгаэмо назву файлу в таблиці
        const sql = `UPDATE heroes SET hero_photo = ? WHERE ID = ?`;
        const params = [path4file, heroId];
        await conn.execute(sql, params);

        return true;
        // Видалємо старі файли

    } catch(e) {
        console.error(e);
        return false;
    }

}





export default {
    setConn,
    get,
    add,
    sorted,
    setStatus,
    deletePhoto,
    setMainPhoto
}