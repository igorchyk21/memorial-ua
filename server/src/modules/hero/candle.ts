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
                flower              as flower,
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
        const [r] = await conn.query<(RowDataPacket & HeroCandleType & {userName1:string, userName2:string})[]>(sql, [heroId, dt]);
        return r.map(row=>({
            ...row,
            flower: Boolean(row.flower),
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
                (dt, hero_id, user_id, user_name, flower, candle_days, candle_price, candle_expiries, candle_comment)
        VALUES  (?,?,?,?,?,?,?,?,?)`;

    const sqlHeroUpdate = `
        UPDATE  heroes
        SET     hero_candle_expiries = ?
        WHERE   ID = ?`;

    const params = [
        dt,
        heroId,
        candle.userId,
        candle.userName,
        candle.flower ? 1 : 0,
        candle.days,
        candle.price,
        expiries,
        candle.comment
    ];

    try {
        const [r] = await conn.query<ResultSetHeader>(sql, params);
        const maxExpiries = await getMaxExpiries(heroId);
        await conn.query(sqlHeroUpdate, [maxExpiries, heroId]);
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
        const [r] = await conn.query<(RowDataPacket & CandleType)[]>(sql, [heroId]);
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
                flower AS flower,
                MAX(candle_expiries) AS expiries
        FROM    heroes_candles
        WHERE   user_id = ?
        GROUP BY hero_id, flower
        HAVING  MAX(candle_expiries) >= ?`;

    try {
        const dt = Date.now();
        const [r] = await conn.query<(RowDataPacket & CandleType)[]>(sql, [userId, dt]);
        return r.map(c => ({
            ...c,
            flower: Boolean(c.flower),
        }));
    } catch (e) {
        console.error(e);
        return null;
    }
};

// Отримуємо ID Героя за ID свічки
const getHeroIdByCandleId = async (candleId:number): Promise<number|null> => {
    const sql = `
        SELECT  hero_id AS heroId
        FROM    heroes_candles
        WHERE   ID = ?`;
    try {
        const [r] = await conn.query<(RowDataPacket & {heroId:number})[]>(sql, [candleId]);
        return r?.[0]?.heroId || null;
    }   
    catch (e) {
        console.error(e);
        return null;
    }
}

// Обробляємо платіж для свічки
const payment2Candle = async (candleId:number, paymentStatus:number, days:number, paymentData:any) => {

    const dt = Date.now();
    const expiries = DT.fromMillis(dt).plus({ days: paymentStatus ? days : 1 }).toMillis();
    const sql = `
        UPDATE  heroes_candles
        SET     payment_status = ?,
                payment_data = ?,
                candle_expiries = ?,
                candle_days = ?
        WHERE   ID = ?`;

    const sqlHeroUpdate = `
        UPDATE  heroes
        SET     hero_candle_expiries = GREATEST(hero_candle_expiries, ?)
        WHERE   ID = ?`;

    const heroId = await getHeroIdByCandleId(candleId);
    if (!heroId) return false;

    try {
        const [r] = await conn.query<ResultSetHeader>(sql, [paymentStatus, JSON.stringify(paymentData), expiries, paymentStatus ? days : 1, candleId]);
        const [rHero] = await conn.query<ResultSetHeader>(sqlHeroUpdate, [expiries, heroId]);
        return r.affectedRows === 1 && rHero.affectedRows === 1;
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