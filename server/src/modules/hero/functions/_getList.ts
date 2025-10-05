import { HERO_STAT, HeroListRequestParams, HeroListResponse, HeroShortType } from "@global/types";
import { Pool, RowDataPacket } from "mysql2/promise";
import conf from "../../../config/conf.js";
import { sanitizeForSQL } from "../../helpers/functions/sanitizeForSQL.js";
import { safeIntParse } from "../../helpers/gim-beckend-helpers.js";
import { sortMethod } from "./sortMethod.js";

export const _getList = async ({
        search='',
        page=1,
        onPage,
        sort='',
        onlyCandle=false,
        status=[HERO_STAT.ENABLE]
    }:HeroListRequestParams, conn:Pool)
    : Promise<HeroListResponse|null> => {
    
    const dt = Date.now();

    const cntOnPage = onPage ? onPage : conf.heroOnPage;
    const from = page > 0 ? (page - 1) * cntOnPage : 0;

    const whereSearch = search ? ` AND 
        CONCAT(hero_fname,hero_lname,hero_mname,hero_callsign) like '%${sanitizeForSQL(search.trim())}%'` : '';
    const whereStatus = status.length>0 ? ` AND hero_status in (${status.map(stat=>safeIntParse(stat)).join(',')}) ` : ''
    const whereCandle = onlyCandle ? ` AND hero_candle_expiries >= ${dt}` : '';

    const where = `
        WHERE   deleted = 0
                ${whereSearch}
                ${whereStatus}
                ${whereCandle}`;
    const order = sortMethod?.[sort] || 'ORDER BY ID DESC';
    const sql = `
        SELECT  ID,
                hero_fname              as fName,
                hero_lname              as lName,
                hero_mname              as mName,
                hero_url                as url,
                hero_birth              as birth,
                hero_death              as death,
                hero_death              as heroDeath,
                hero_mobilization       as mobilization,
                hero_callsign           as callSign,
                hero_photo              as photo,
                hero_status             as status
        FROM    heroes
                ${where}
                ${order}
        LIMIT   ${from}, ${cntOnPage}`;
    
    const sqlPaginator = `
        SELECT  COUNT(ID) as CNT
        FROM    heroes
                ${where}`;

    try {
        const [r] = await conn.execute<(RowDataPacket & HeroShortType)[]>(sql);
        const [rP] = await conn.execute<(RowDataPacket & {CNT:number})[]>(sqlPaginator);

        const paginator = {
            countRows       : rP[0].CNT,
            countPages      : Math.ceil(rP[0].CNT / cntOnPage),
            currentPage     : page,
            onPage          : cntOnPage  
        } 

        return {
            heroes:r,
            paginator
        }

    } catch(e){
        console.error(e);
        return null;
    }
}