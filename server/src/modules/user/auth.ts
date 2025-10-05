import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import conf from "../../config/conf.js";
import jwt  from "jsonwebtoken";
import { useAuthFields } from "./const/userAuthFields.js";
import generateOTP from "./helpers/generateOTP.js";
import { SendMail } from "../mail/mailer.js";
import { row2UserData } from "./helpers/row2UserData.js";
import { USER_STATUS, UserData } from "@global/types";
  
let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// авторизація - Логін/пароль
const login = async (email:string|undefined, password:string|null, passwordNotRequired=false)
	: Promise<UserData|null> =>{

	if (!email) return null;

	const wherePassword = passwordNotRequired ? ''
        : 'and users.password = SHA2(? , 256)'

    // Отримуємо дані користувача
    const sql   = ` SELECT  ${useAuthFields.join(',')} 
                    FROM    users
                    WHERE   ban = 0
					AND		stat = ${USER_STATUS.ENABLE}
                    AND     user_email like ?
                            ${wherePassword}`;


	try {
		const [r] = await conn.execute<(RowDataPacket & UserData)[]>(sql, passwordNotRequired ?  [email] : [email, password||'']);
		if (!r?.[0]) return null;
		return row2UserData(r?.[0]);
	} catch(e){
		console.error(e);
		return null;
	}
}
 
// авторизація через токен
const loginByJWT = async (token:string)
	: Promise<UserData|null> =>{
 
	if (!conn) throw new Error('DB connection not initialized');

	await clearOlderJWT();

	const jwtValid = Date.now();
	const validDt = Date.now() + conf.jwtvalid * 1000;

	const sql = `
		SELECT  ${useAuthFields.join(',')}
		FROM 	users
		LEFT 	JOIN users_jwt ON users.ID = users_jwt.user_id
		WHERE 	users.ban = 0
		AND		users_jwt.jwt = ? 
		AND		users_jwt.lasttime >= ?`;
 
	try {
		const [r] = await conn.execute<(RowDataPacket & UserData)[]>(sql, [token, jwtValid]);
		if (r.length > 0) await updateJWT(token); 
			else return null;	
			
		return row2UserData(r?.[0]);
	} catch (e) { 
		console.error(e);
		return null;
	}
}

// Оновлення валідності токена
const updateJWT = async (token:string)
	: Promise<boolean> =>{ 
	const validDt = Date.now()+ conf.jwtvalid * 1000;
	const sql = `UPDATE users_jwt SET lasttime = ${validDt} WHERE jwt = ?`;
	try { 
		const [r] = await conn.execute<ResultSetHeader>(sql, [token])
		return r.affectedRows === 1
	} catch(e){
		console.error(e);
		return false
	}
}

// Створення нового JWT
const createJWT = (user: UserData)
	: string | null => {
	try {
		const payload = {
			...user,
			dt: Date.now()
		};
		return jwt.sign(payload, conf.secretKey||'');
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Видалення JWT з БД
const removeJWT = async (token: string)
	: Promise<boolean> => {
	const sql = `DELETE FROM users_jwt WHERE jwt = ?`;
	try {
		await clearOlderJWT();
		await conn.execute(sql, [token]);
		return true;
	} catch (error) {
		console.error(error)
		return false;
	}
};
 
// Встановлюємо токен досутпуу для користувача в БД
const JWT2User = async (ID:number, jwt:string)
	: Promise<boolean> => {
    await clearOlderJWT();
    const validDt = (Date.now()) + conf.jwtvalid*1000;

    const sql = `
        INSERT  INTO users_jwt
                (user_id, jwt, lasttime)
        VALUE   (?,?,?);
    `;
    const params = [ID, jwt, validDt];

    try {
        const [r,f] = await conn.execute<ResultSetHeader>(sql, params);
        return r.affectedRows == 1;
    } catch(e) {
        console.error(e);
        return false;
    }
}

// Очищення таблиці токен від недійсних токенів
const clearOlderJWT = async ()
	: Promise<boolean> => {
    const jwtValid = Date.now();
    const sql = `
        DELETE  FROM users_jwt
        WHERE   users_jwt.lasttime < ?`;  
        
    try {
        await conn.execute(sql,[jwtValid]);
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}

// Генерація та збереження OTP
const otpCreate = async (email: string)
	: Promise<boolean> => {
	const otp = generateOTP();
	const otpExpiries = Date.now() + 1000 * 60 * 5;

	const sql = `
		UPDATE 	users
		SET 	otp = ?,
				otp_retry = 3,
				otp_expiries = ?
		WHERE 	user_email = ?
		AND		ban = 0`;

	try {
		const [result] = await conn.execute<ResultSetHeader>(sql, [otp, otpExpiries, email]);
		if (result.affectedRows)
			return await sendOtp(email, otp); 
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Перевірка OTP
const otpVerify = async (email: string, otp: string)
	: Promise<number | false> => {
	const otpExpiries = Date.now();

	const sqlRetry = `
		UPDATE	users
		SET 	otp_retry = otp_retry - 1
		WHERE	user_email = ?`;

	const sqlOtp = `
		SELECT 	COUNT(*) as CNT
		FROM 	users
		WHERE 	user_email = ?
		AND 	otp = ?
		AND 	otp_expiries >= ?
		AND 	otp_retry >= 0`;

	try {
		const [resultRetry] = await conn.execute<ResultSetHeader>(sqlRetry, [email]);
		if (resultRetry.affectedRows !== 1) return false;

		const [rows] = await conn.execute<RowDataPacket[]>(sqlOtp, [email, otp, otpExpiries]);
		return rows?.[0]?.CNT || false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Зміна пароля користувача
const setPassword = async (email: string,password: string,otp: string)
	: Promise<boolean> => {
	
	const otpExpiries = Date.now();

	const sqlPass = `
		UPDATE 	users
		SET 	password = SHA2(? , 256),
				otp = NULL,
				otp_retry = 0,
				otp_expiries = 0
		WHERE 	user_email = ?
		AND 	otp = ?
		AND 	otp_retry >= 0
		AND 	otp_expiries > ?`;

	try {
		const [result] = await conn.execute<ResultSetHeader>(sqlPass, [password, email, otp, otpExpiries]);
		return result.affectedRows === 1;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Надсилання OTP на email
const sendOtp = async (email: string, otp: string)
	: Promise<boolean> => {
	const HTML = `
		<h1>Your code to recover your password</h1>
		<h2>${otp}</h2>`;
  
	return await SendMail({
		to: email,
		subject: `${conf.GoogleName} - Recovery Password`,
		templateHTML: HTML,
		mailData: {}
	});
};


 
export default {
	setConn,
	
	login,
	loginByJWT,
	createJWT,
	JWT2User,
	updateJWT,
	removeJWT,

	otpCreate,
	otpVerify,
	setPassword,

}
 
