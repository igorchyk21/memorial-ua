import { CandleType, HeroCandleDataType, HeroCandleType } from "@global/types";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DateTime as DT } from "luxon";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// Повертає свічки Героя (активні і просрочені, але платні)
const getByHeroId = async (heroId:number): Promise<HeroCandleType[] | null> => {
    const dt = Date.now();
    const sql = `
        SELECT  heroes_candles.ID   as ID,
                hero_id             as heroId,
                user_id             as userId,
                heroes_candles.user_name  as userName1,
                dt                  as dt,
                candle_days         as days,
                candle_price        as price,
                candle_expiries     as expiries,
                candle_comment      as comment,
                users.user_name     as userName2,
                users.user_picture  as userPicture
                
        FROM    heroes_candles
        LEFT    JOIN users ON users.ID = heroes_candles.user_id
        WHERE   hero_id = ?
        AND     (candle_expiries >= ? OR payment_status = 1)
        ORDER   BY dt DESC
        LIMIT   0, 300`;

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroCandleType & {userName1:string, userName2:string})[]>(sql, [heroId, dt]);
        return r.map(row=>({
            ...row,
            userName: row.userId ? row.userName2 :row.userName1
        }));
        
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Додаємо свічку Герою
const add = async (heroId:number, candle:HeroCandleDataType)
    : Promise<{id:number, expiries:number}|null> => {

    const dt = Date.now();
    const expiries = DT.fromMillis(dt).plus({ days: candle.days }).toMillis();
    const sql = `
        INSERT  INTO heroes_candles
                (dt, hero_id, user_id, user_name, candle_days, candle_price, candle_expiries, candle_comment)
        VALUES  (?,?,?,?,?,?,?,?)`;

    const sqlHeroUpdate = `
        UPDATE  heroes
        SET     hero_candle_expiries = ?
        WHERE   ID = ?`;

    const params = [
        dt,
        heroId,
        candle.userId,
        candle.userName,
        candle.days,
        candle.price,
        expiries,
        candle.comment
    ];

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        const maxExpiries = await getMaxExpiries(heroId);
        await conn.execute(sqlHeroUpdate, [maxExpiries, heroId]);
        return {id:r.insertId, expiries:expiries};
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

// Обробляємо платіж для свічки
const payment2Candle = async (candleId:number, paymentStatus:number, days:number, paymentData:any) => {

    const dt = Date.now();
    const expiries = DT.fromMillis(dt).plus({ days: days }).toMillis();
    const sql = `
        UPDATE  heroes_candles
        SET     payment_status = ?,
                payment_data = ?,
                candle_expiries = ?
        WHERE   ID = ?`;

    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [paymentStatus, JSON.stringify(paymentData), expiries, candleId]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export default {
    setConn,
    add,
    getByUserId,
    getMaxExpiries,
    payment2Candle,
    getByHeroId
}