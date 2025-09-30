import dotenv from "dotenv";
import { safeIntParse } from "../modules/helpers/gim-beckend-helpers.js";
dotenv.config();

const conf = {
    port: safeIntParse(process.env.PORT || "3333", 3333),

    mysql_host: process.env.MYSQL_HOST,
    mysql_data: process.env.MYSQL_DATA,
    mysql_user: process.env.MYSQL_USER,
    mysql_pass: process.env.MYSQL_PASS,
    mysql_pools: safeIntParse(process.env.MYSQL_POOLS || "10", 10),
 
    stat_host: process.env.STAT_HOST,
    stat_data: process.env.STAT_DATA, 
    stat_user: process.env.STAT_USER,
    stat_pass: process.env.STAT_PASS, 

    secretKey: process.env.SECRET_KEY,
    jwtvalid:  safeIntParse(process.env.JWT_VALID) || 2 * 24 * 60 * 60,

    GoogleName: process.env.GOOGLE_NAME,
    GoogleEmail: process.env.GOOGLE_EMAIL,
    GoogleApppass: process.env.GOOGLE_APP_PASS,
    googleID: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    googleApiKey: process.env.GOOGLE_API_KEY,

    captchaSecret: process.env.CAPTCHA_SECRET, 

}


export default conf;