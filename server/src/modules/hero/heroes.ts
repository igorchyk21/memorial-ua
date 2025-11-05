import { HERO_POST_STAT, HERO_STAT, HeroListRequestParams, HeroListResponse, HeroPostType, HeroShortType } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { _getList } from "./functions/_getList.js";
import { sanitizeForSQL } from "../helpers/functions/sanitizeForSQL.js";
import { safeIntParse } from "../helpers/gim-beckend-helpers.js";
import { cleanHTML } from "../helpers/functions/cleanHTML.js";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// повертає список героїв
const getList = async (params:HeroListRequestParams, heroId?:number)
    : Promise<HeroListResponse|null> => {
    return await _getList(params, heroId, conn)
}

// Зберігає Героя
const save = async(hero:HeroShortType)
    : Promise<boolean|number> => {

    if (!hero.ID) return false;

    const sql = `
        UPDATE  heroes
        SET     hero_fname = ?,
                hero_lname = ?,
                hero_mname = ?,
                hero_birth = ?,
                hero_mobilization = ?,
                hero_death = ?,
                hero_army_name = ?,
                hero_callsign = ?,
                hero_about = ?
        WHERE   ID = ?
        AND     deleted = 0`;

    const params = [
        hero.fName,
        hero.lName,
        hero.mName,
        hero.birth,
        hero.mobilization,
        hero.death,
        hero.armyName,
        hero.callSign,
        cleanHTML(hero.about||''),
        hero.ID
    ];

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        return r.affectedRows === 1 ? hero.ID : false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// змінює статус героя
const setStatus = async (heroId:number, heroStatus:HERO_STAT)
    : Promise<boolean> => {

    const sql = `
        UPDATE  heroes
        SET     hero_status = ? 
        WHERE   ID = ?`;
    
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [heroStatus, heroId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}
// видаляє героя (маркування)
const deleteMark = async (heroId:number, mark:boolean|undefined=true)
    :Promise<boolean> => {

    const sql = mark 
        ? 'UPDATE heroes SET deleted = 1 WHERE ID = ?'
        : 'DELETE FROM heroes WHERE ID = ?'

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [heroId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}


// повертає список дописів
const getPosts = async (heroId:number)
    : Promise<HeroPostType[]|null> => {

    const sql = `
        SELECT  heroes_posts.ID,
                heroes_posts.hero_id        as heroId,
                heroes_posts.user_id        as userId,
                heroes_posts.post_dt        as dt,
                heroes_posts.post_body      as body,
                heroes_posts.post_status    as status,
                heroes_posts.post_author    as author,
                users.user_name             as userName,
                users.user_picture          as userPicture 
                
        FROM    heroes_posts
        LEFT    JOIN users ON users.ID = heroes_posts.user_id
        WHERE   heroes_posts.hero_id = ?
        ORDER   BY heroes_posts.ID DESC`;

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroPostType)[]>(sql,[heroId]);
        return r;
    } catch(e){
        console.error(e);
        return null;
    }

}

// Збереження допису
const savePost = async (postId:number, postBody:string) 
    : Promise<boolean> => {

    const sql = `
        UPDATE  heroes_posts SET post_body = ? WHERE ID = ?`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql,[cleanHTML(postBody), postId]);
        return r.affectedRows === 1;
    } catch(e) {
        console.error(e);
        return false;
    }
}

// Зміна стутусу допису
const setStatusPost = async (postId:number, postStatus:HERO_POST_STAT)
    : Promise<boolean> => {

    const sql = `UPDATE heroes_posts SET post_status = ? WHERE ID = ?`;
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [postStatus, postId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Свторення допису
const createPost = async (post:HeroPostType) 
    : Promise<boolean> => {

    const sql = `
        INSERT  INTO heroes_posts
                (hero_id, user_id, post_dt, post_author, post_body, post_status)
        VALUES  (?,?,?,?,?,?)`

    const params = [
        post.heroId,
        post.userId,
        Date.now(),
        post.author,
        cleanHTML(post.body),
        HERO_POST_STAT.PENDING]

    try { 
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

const deletePost = async (postId:number, userId?:number)
    : Promise<boolean> => {

    const where = ` 
        WHERE   ID = ${safeIntParse(postId)} 
                ${typeof userId !== 'undefined' ? `AND user_id = ${safeIntParse(userId)}` : '' }`;
    const sql = `DELETE FROM heroes_posts ${where}`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql);
        return r.affectedRows  === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

export default {
    setConn,
    getList,
    save,
    setStatus,
    deleteMark,

    getPosts,
    savePost,
    createPost,
    setStatusPost,
    deletePost

}
