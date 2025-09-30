import mysql, { Pool }  from "mysql2/promise";
import conf from "../config/conf.js";
 
const _db = {

    conn : ():Pool => {
        return mysql.createPool({
            host: conf.mysql_host,
            database: conf.mysql_data,
            user: conf.mysql_user,
            password: conf.mysql_pass,
            waitForConnections: true,
            connectionLimit: conf.mysql_pools ? conf.mysql_pools : 10,
            queueLimit: 10
        });
    },

    connStat : ():Pool => {
        return mysql.createPool({
            host: conf.stat_host,
            database: conf.stat_data,
            user: conf.stat_user,
            password: conf.stat_pass,
            waitForConnections: true,
            connectionLimit: conf.mysql_pools ? conf.mysql_pools : 10,
            queueLimit: 10
        });
    }

}

export default _db;
