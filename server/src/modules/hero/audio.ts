import { HERO_AUDIO_STAT, HeroAudioItem } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { safeIntParse } from "../helpers/gim-beckend-helpers.js";
import { deleteFile } from "../helpers/files/files.js";

let conn: Pool;
const setConn = (_conn: Pool) => { conn = _conn; };

const get = async (heroId: number | null, audioId?: number)
    : Promise<HeroAudioItem[] | null> => {

    const sql = `
        SELECT  heroes_audios.ID                 as ID,
                heroes_audios.hero_id            as heroId,
                heroes_audios.user_id            as userId,
                heroes_audios.upload_dt          as uploadDt,
                heroes_audios.audio_url          as url,
                heroes_audios.audio_description  as description,
                heroes_audios.audio_status       as status,
                heroes_audios.upload_dt          as dt,
                users.user_email                 as userEmail,
                users.user_name                  as userName,
                users.user_picture               as userPicture 
        FROM    heroes_audios
        LEFT    JOIN users ON users.ID = heroes_audios.user_id
        WHERE   ${audioId ? "heroes_audios.ID = ?" : "heroes_audios.hero_id = ?"}
        AND     heroes_audios.deleted = 0
        ORDER   BY audio_ord, ID DESC`;

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroAudioItem)[]>(sql, [audioId ? audioId : heroId]);
        return r;
    } catch (e) {
        console.error(e);
        return null;
    }

};

// Додаємо аудіо Героя
const add = async (heroId: number, userId: number, audios: string[], description: string, audioStatus = HERO_AUDIO_STAT.PENDING)
    : Promise<boolean> => {

    const sql = `
        INSERT  INTO heroes_audios
                (hero_id, user_id, upload_dt, audio_url, audio_description, audio_status)
        VALUES  (?,?,?,?,?,?)`;

    let res = true;
    try {
        for (const audio of audios) {
            const params = [heroId, userId, Date.now(), audio, description, audioStatus];
            const [r] = await conn.execute<ResultSetHeader>(sql, params);
            if (r.affectedRows !== 1) res = false;
        }
        return res;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// Зміна опису аудіо
const setDescription = async (audioId: number, description: string) 
    : Promise<boolean> => {
    const sql = `
        UPDATE heroes_audios SET audio_description = ? WHERE ID = ?`;
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [description, audioId]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// Сортування аудіо
const sorted = async (heroId: number, sortedIds: number[]) => {
    const sql = `
        UPDATE heroes_audios SET audio_ord = ? WHERE ID = ? AND hero_id = ?`;

    try {
        for (let i = 0; i < sortedIds.length; i++) {
            await conn.execute(sql, [i, sortedIds[i], heroId]);
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const setStatus = async (audioId: number, audioStatus: HERO_AUDIO_STAT)
    : Promise<boolean> => {

    const sql = `
        UPDATE  heroes_audios
        SET     audio_status = ?
        WHERE   ID = ?
    `;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [audioStatus, audioId]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deleteAudio = async (audioId: number, userId: number)
    : Promise<boolean> => {

    const audio = await get(null, audioId);
    if (!audio?.[0]) return false;

    const where = ` 
        WHERE   ID = ${safeIntParse(audioId)} 
                ${typeof userId !== "undefined" ? `AND user_id = ${safeIntParse(userId)}` : "" }`;

    const sql = `DELETE FROM heroes_audios ${where}`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql);
        await deleteFile(audio?.[0].url);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default {
    setConn,
    get,
    add,
    sorted,
    setStatus,
    deleteAudio,
    setDescription
};


