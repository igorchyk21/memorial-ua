import { UserData } from "@global/types";
import { RowDataPacket } from "mysql2";
  
export const row2UserData = (row:RowDataPacket & UserData):UserData=>{
    const tariff = (row.expiries||0) > Math.floor(Date.now() / 1000) ? row.tariff : 0;
    const user: UserData = {
        ...row,
        ban: !!row.ban,
        admin: !!row.admin
    }

    return user;
}