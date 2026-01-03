import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { ca } from "zod/v4/locales";
import _hero from "../hero/heroes.js";
import _heroBiography from "../hero/biography.js";
import { HeroBiographyItem, HeroShortType } from "@global/types";
import t from "../../messages/ua/common.json" assert { type: "json" };
import { DateTime as DT} from "luxon";
import _user from "../user/users.js";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };


// додає базові події до біографії
const addBaseDt = (hero: HeroShortType, biography: HeroBiographyItem[]) => {
    if (!biography?.length) biography = [];

    const existing = new Set(biography.map(b => b.dt));

    const baseEvents = [
        { dt: hero.birth,        title: t.birth },
        { dt: hero.mobilization, title: t.mobilization },
        { dt: hero.death,        title: t.death },
    ].filter(e => e.dt); // прибираємо null / undefined

    for (const { dt, title } of baseEvents) {
        if (!existing.has(dt)) {
            biography.push({
                ID: 0,
                heroId: hero.ID,
                dt,
                title,
            });
            existing.add(dt);
        }
    }
};

// повертає список підписок
const getSubscriptions = async (): Promise<{heroId:number, userId:number}[] | null> => {
    const sql = `
        SELECT  hero_id         as heroId,
                user_id         as userId
        FROM    heroes_subscriptions`;

    try {
        const [r] = await conn.execute<(RowDataPacket & {heroId:number, userId:number})[]>(sql);
        return r
    } catch (e) {
        console.error(e);
        return null;
    }
}


const execute  = async () => {
    const subscriptions = await getSubscriptions();
    if (!subscriptions) return;

    const heoIds = Array.from(new Set(subscriptions?.map(s => s.heroId) || []));
    const today = DT.now().setZone('utc');
    

    // крутимось по всіх героях і збираємо всі сьогднішній події
    const todayHeroEvents:HeroBiographyItem[] = [];
    for (const heroId of heoIds) {
        // отримуємо героя
        const hero = (await _hero.getList({}, heroId))?.heroes?.[0] || null;
        if (!hero) continue;
        // отримуємо біографію та додаємо базові події
        const biography = await _heroBiography.get(heroId) || [];
        addBaseDt(hero, biography);

        // крутимось по всіх подіях і збираємо всі сьогднішній події
        for (const bio of biography) 
            if (today.hasSame(DT.fromMillis(bio.dt), "day")) todayHeroEvents.push(bio);
    }

    for (const subscribe  of subscriptions){

        const event = todayHeroEvents.find(event=>event.heroId === subscribe.heroId);
        if (!event) continue;

        const userEmail = await _user.getEmailById(subscribe.userId);

        //console.log(event);
        //console.log(subscribe.userId);
        //console.log(userEmail);

        // перевіряє чи можна надсилати подію (чи вже надіслали в цьому році)
        const allow = await allowSendEvent(subscribe.userId, event.heroId, event.dt);

        if (allow) {

            /**
             * Надсилаємо подію на email
             */
            console.log('SEND EVENT = ', event);

            // додаємо подію до історії (щоб не надсилати вже надіслану подію в цьому році)
            await event2history(subscribe.userId, event.heroId, event.dt);
        }
        
    }
}

// додає подію до історії
const event2history = async (userId:number, heroId:number, heroDt:number)
    : Promise<boolean> => {
    const year = DT.now().year;
    const sql = `
        INSERT  INTO event_history
                (user_id, hero_id, hero_dt, year)
        VALUES (?, ?, ?, ?)`


    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [userId, heroId, heroDt, year]);
        return r.affectedRows === 1;
    } catch (e) {
        console.error(e);
        return false;
    }

}


// перевіряє чи можна надсилати подію
const allowSendEvent = async (userId:number, heroId:number, heroDt:number)
    : Promise<boolean> => {
    const year = DT.now().year;
    const sql = `
        SELECT  COUNT(*) as CNT
        FROM    event_history
        WHERE   user_id = ? AND hero_id = ? AND year = ?`;

    try {
        const [r] = await conn.execute<RowDataPacket[]>(sql, [userId, heroId, year]);
        return r[0]?.CNT === 0;
    } catch (e) {
        console.error(e);
        return false;
    }
} 

export default {
    setConn,
    execute
} 