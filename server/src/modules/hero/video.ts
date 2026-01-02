import { HERO_VIDEO_STAT, HeroVideoItem } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { safeIntParse } from "../helpers/gim-beckend-helpers.js";
import { deleteFile } from "../helpers/files/files.js";

let conn: Pool;
const setConn = (_conn: Pool) => { conn = _conn; };

const get = async (heroId: number | null, videoId?: number)
    : Promise<HeroVideoItem[] | null> => {

    const sql = `
        SELECT  heroes_videos.ID                 as ID,
                heroes_videos.hero_id            as heroId,
                heroes_videos.user_id            as userId,
                heroes_videos.upload_dt          as uploadDt,
                heroes_videos.video_url          as url,
                heroes_videos.video_description  as description,
                heroes_videos.video_status       as status,
                heroes_videos.upload_dt          as dt,
                users.user_email                 as userEmail,
                users.user_name                  as userName,
                users.user_picture               as userPicture 
        FROM    heroes_videos
        LEFT    JOIN users ON users.ID = heroes_videos.user_id
        WHERE   ${videoId ? "heroes_videos.ID = ?" : "heroes_videos.hero_id = ?"}
        AND     heroes_videos.deleted = 0
        ORDER   BY video_ord, ID DESC`;

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroVideoItem)[]>(sql, [videoId ? videoId : heroId]);
        return r;
    } catch (e) {
        console.error(e);
        return null;
    }

};

// Додаємо відео Героя
const add = async (heroId: number, userId: number, videos: string[], description: string, videoStatus = HERO_VIDEO_STAT.PENDING)
    : Promise<boolean> => {

    const sql = `
        INSERT  INTO heroes_videos
                (hero_id, user_id, upload_dt, video_url, video_description, video_status)
        VALUES  (?,?,?,?,?,?)`;

    let res = true;
    try {
        for (const video of videos) {
            const params = [heroId, userId, Date.now(), video, description, videoStatus];
            const [r] = await conn.execute<ResultSetHeader>(sql, params);
            if (r.affectedRows !== 1) res = false;
        }
        return res;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// Зміна опису відео 
const setDescription = async (videoId: number, description: string) 
    : Promise<boolean> => {
    const sql = `
        UPDATE heroes_videos SET video_description = ? WHERE ID = ?`;
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [description, videoId]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

// Сортування відео
const sorted = async (heroId: number, sortedIds: number[]) => {
    const sql = `
        UPDATE heroes_videos SET video_ord = ? WHERE ID = ? AND hero_id = ?`;

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

const setStatus = async (videoId: number, videoStatus: HERO_VIDEO_STAT)
    : Promise<boolean> => {

    const sql = `
        UPDATE  heroes_videos
        SET     video_status = ?
        WHERE   ID = ?
    `;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [videoStatus, videoId]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const deleteVideo = async (videoId: number, userId: number)
    : Promise<boolean> => {

    const video = await get(null, videoId);
    if (!video?.[0]) return false;

    const where = ` 
        WHERE   ID = ${safeIntParse(videoId)} 
                ${typeof userId !== "undefined" ? `AND user_id = ${safeIntParse(userId)}` : "" }`;

    const sql = `DELETE FROM heroes_videos ${where}`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql);
        await deleteFile(video?.[0].url);
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
    deleteVideo,
    setDescription
};


