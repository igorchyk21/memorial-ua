import { ContentBaseType } from "@global/types";
import { Pool, RowDataPacket } from "mysql2/promise";
import { sanitizeForSQL } from "../helpers/functions/sanitizeForSQL.js";

const cache:Record<string,any> = {};

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };



// Контен головного слайдера
const getBigSlider = async ()
    : Promise<ContentBaseType[]|null> => {

    
    const sql = `
        SELECT  title,
                image,
                description,
                background
        FROM    content_bigslider
        WHERE   deleted = 0
        ORDER   BY sort` 

    try {
        const [r] = await conn.execute<(RowDataPacket & ContentBaseType)[]>(sql);
        return r;
    } catch(e){
        console.error(e);
        return null
    }
}

const getContent = async (contentName:string)
    : Promise<ContentBaseType[]|null> => {
    console.log(JSON.stringify(cache).length)
    const sql = `
        SELECT  *
        FROM    content_${sanitizeForSQL(contentName)}
        ORDER   BY sort`;

    try {
        if (cache[contentName]) {
            // повертаємо старе значення
            const oldValue = cache[contentName];

            // запускаємо оновлення у фоні
            (async () => {
                cache[contentName] = (await conn.execute<(RowDataPacket & ContentBaseType)[]>(sql))[0];
            })();

            return oldValue;
        } else {
            cache[contentName] = (await conn.execute<(RowDataPacket & ContentBaseType)[]>(sql))[0];
            return cache[contentName];
        }
    } catch(e){
        console.error(e);
        return null;
    }
}



export default {
    setConn,
    getBigSlider,
    getContent
}