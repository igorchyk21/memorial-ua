import { HeroListRequestParams, HeroListResponse } from "@global/types";
import { Pool, RowDataPacket } from "mysql2/promise";
import { _getList } from "./functions/_getList.js";

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

const getList = async (params:HeroListRequestParams)
    : Promise<HeroListResponse|null> => {
    return await _getList(params, conn)
}

export default {
    setConn,
    getList
}
