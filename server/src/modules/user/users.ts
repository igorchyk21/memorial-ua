import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DateTime as DT } from "luxon";
import { safeIntParse } from "../helpers/gim-beckend-helpers.js";
import { UserCreateData } from "@global/types";
   
let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

const createUser = async (cUser:UserCreateData, verifyExists = true, updateMode = false)
    :Promise<number|null> => { 

    if ((!cUser.userName) || (!cUser.userEmail)) return null; 
    const user = verifyExists ? await getUserFullByEmail(cUser.userEmail) : null;

    const today = DT.now().toFormat("yyyy-MM-dd");
    // Якщо користувач існує і статус активний - повертаємо помилку існування користувача
    if (user) return null;

    const sql = updateMode
        ? `
            UPDATE  users
            SET     google_id = ?, 
                    user_email = ?,
                    user_name = ?, 
                    user_picture = ?,

                    stat = ${safeIntParse(cUser.userStatus)}
            WHERE   g_email = ?`
        : `
            INSERT  INTO users
                (google_id, user_email, user_name, usr_picture)
        VALUES  (?,?,?,?)`

    const params = [
        cUser.googleId||cUser.userEmail,
        cUser.userEmail,
        cUser.userName,
        cUser.userPicture||''];
    
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, params);
        return updateMode ? r.affectedRows || null : r.insertId || null;
    } catch(e){
        console.error(e);
        return null;
    }

    return null;
}

// повертає повну структуру користувача по його емейлу
const getUserFullByEmail = async (userEmail?:string)
    :Promise<Record<string,any>|null> => {
    if (!userEmail) return null;
    const sql = `SELECT * from users WHERE g_email = ?`;
    try {
        const [r] = await conn.execute<(RowDataPacket & Record<string,any>)[]>(sql,[userEmail.trim()]);
        return r[0] || null;
    } catch(e){
        console.error(e); 
        return null;
    }
}
 

// зміна статусу користувача
const changeStatus = async (userId:number, userStatus:number)
    :Promise<boolean> => {
    const sql = `UPDATRE users SET stat = ? WHERE ID = ?`;
    try {
        const [r] = await conn.execute<ResultSetHeader>(sql, [userStatus, userId]);
        return r.affectedRows === 1;
    } catch(e){
        console.error(e);
        return false;
    }
}

export default { 
    setConn,

    createUser,
    getUserFullByEmail,
   
    
}
