import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };


// Додавання підписки на Героя
const addSubscription = async (heroId:number, userId:number) : Promise<number|false> => {
    const dt = Date.now();
    const sql = `
        INSERT INTO heroes_subscriptions (dt, hero_id, user_id)
        VALUES (?, ?, ?)
    `;

    try {
        const [result] = await conn.execute<ResultSetHeader>(sql, [dt, heroId, userId]);
        return result.insertId;
    } catch (error) {
        console.error(error);
        return false;   
    }
}

// Видалення підписки на Героя
const removeSubscription = async (heroId:number, userId:number) : Promise<boolean> => {
    const sql = `
        DELETE FROM heroes_subscriptions WHERE hero_id = ? AND user_id = ?
    `;
    try {
        const [result] = await conn.execute<ResultSetHeader>(sql, [heroId, userId]);
        return result.affectedRows > 0;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

// Отримання списку підписок на Героя за ІД користувача
const getSubscriptionByUserId = async (userId:number) : Promise<number[]|null> => {
    const sql = `
        SELECT hero_id FROM heroes_subscriptions WHERE user_id = ?
    `;
    try {
        const [result] = await conn.execute<(RowDataPacket & { hero_id: number })[]>(sql, [userId]);
        return result.map(row => row.hero_id);
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}

// Отримання списку підписок на Героя за ІД Героя
const getSubscriptionByHeroId = async (heroId:number) : Promise<number[]|null> => {
    const sql = `
        SELECT user_id FROM heroes_subscriptions WHERE hero_id = ?
    `;
    try {
        const [result] = await conn.execute<(RowDataPacket & { user_id: number })[]>(sql, [heroId]);
        return result.map(row => row.user_id);
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export default {
    setConn,
    addSubscription,
    removeSubscription,
    getSubscriptionByUserId,
    getSubscriptionByHeroId,
}