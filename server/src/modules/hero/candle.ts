import { CandleType, HeroCandleDataType } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DateTime as DT } from "luxon";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };


// Додаємо свічку Герою
const add = async (heroId:number, candle:HeroCandleDataType)
    : Promise<number|null> => {

    const dt = Date.now();
    const expiries = DT.fromMillis(dt).plus({ days: candle.days }).toMillis();
    const sql = `
        INSERT  INTO heroes_candles
                (dt, hero_id, user_id, candle_days, candle_price, candle_expiries, candle_comment)
        VALUES  (?,?,?,?,?,?,?)`;

    const sqlHeroUpdate = `
        UPDATE  heroes
        SET     hero_candle_expiries = ?
        WHERE   ID = ?`;

    const params = [
        dt,
        heroId,
        candle.userId,
        candle.days,
        candle.price,
        expiries,
        candle.comment
    ];

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        const maxExpiries = await getMaxExpiries(heroId);
        await conn.execute(sqlHeroUpdate, [maxExpiries, heroId]);
        return expiries;
    } catch(e) {
        console.error(e);
        return null;
    }

}

// максимальна дата експірування свічки Героя
const getMaxExpiries = async (heroId: number): Promise<number|null> => {
    const sql = `
        SELECT  MAX(candle_expiries) AS expiries
        FROM    heroes_candles
        WHERE   hero_id = ?`;
    try {
        const [r] = await conn.execute<(RowDataPacket & CandleType)[]>(sql, [heroId]);
        return r?.[0]?.expiries || null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Отримуємо свічки користувача
const getByUserId = async (userId: number): Promise<CandleType[] | null> => {
    const sql = `
        SELECT  hero_id AS heroId,
                MAX(candle_expiries) AS expiries
        FROM    heroes_candles
        WHERE   user_id = ?
        GROUP BY hero_id
        HAVING  MAX(candle_expiries) >= ?`;

    try {
        const dt = Date.now();
        const [r] = await conn.execute<(RowDataPacket & CandleType)[]>(sql, [userId, dt]);
        return r;
    } catch (e) {
        console.error(e);
        return null;
    }
};


export default {
    setConn,
    add,
    getByUserId,
    getMaxExpiries
}