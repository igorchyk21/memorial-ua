import { HeroBiographyType, HeroBiographyItem } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { cleanHTML } from "../helpers/functions/cleanHTML.js";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// Повертає біографію - масив подій
const get = async (heroId:number)
    : Promise<HeroBiographyType|null> => {

    const sql = `
        SELECT  ID,
                hero_id             as heroId,
                biography_dt        as dt,
                biography_title     as title,
                biography_body      as body 
        FROM    heroes_biography
        WHERE   hero_id = ?`;

    

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroBiographyItem)[]>(sql,[heroId]);
        return r;
    } catch(e){
        console.error(e);
        return null;
    }
}

const create = async (biography:HeroBiographyItem)
    : Promise<boolean> => {

    if ((!biography.heroId) || (!Boolean(biography.title.trim()))) return false;

    const sql = `
        INSERT  INTO heroes_biography
                (hero_id, biography_dt, biography_title, biography_body)
        VALUES  (?,?,?,?)`;

    const params = [
        biography.heroId,
        biography.dt,
        biography.title,
        biography.body ? cleanHTML(biography.body) : null
    ]   

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        return r.affectedRows  === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Збереження події
const save = async (biographyId:number, biography:HeroBiographyItem)
    : Promise<boolean> => {

    if (!Boolean(biography.title.trim())) return false;

    const sql = `
        UPDATE  heroes_biography
        SET     biography_dt = ?, 
                biography_title = ?,
                biography_body = ?
        WHERE   ID = ?`;

    const params = [
        biography.dt,
        biography.title,
        biography.body ? cleanHTML(biography.body) : null,
        biographyId
    ]

    try { 
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }

}   

const deleteBio = async (biographyId:number) 
    : Promise<boolean> => {

    const sql = 'DELETE FROM heroes_biography WHERE ID = ?';
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [biographyId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}
 

export default {
    setConn,
    create,
    save,
    deleteBio,
    get
}
