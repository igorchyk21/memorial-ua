import express, { Request, Response } from "express";
import _usersAuth from "../modules/user/auth.js";
import _user from "../modules/user/users.js"
import { middleRecaptcha } from "../middleware/middleRecaptcha.js";
import validator from "validator";
import axios from "axios";
import { getUserFromGoogle } from "../modules/user/helpers/getUserFromGoogle.js";
import { API_USERS, AuthRecoveryData, AuthRegisterData, USER_STATUS } from "@global/types";
import _heroCandle from "../modules/hero/candle.js";
 
const router = express.Router();

router.get('/about', (req:Request, res:Response)=>{
    res.json({
        author:'Gryb Igor'
    })
})

// локальна авторизація (пароль-логін/токен)
router.post('/local', async (req:Request, res:Response) => {

    // Підготовка та верифікація вхідних даних
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    const loginToken = req.body.token;  
    if (((!loginEmail) || (!loginPassword)) && (!loginToken)) return res.sendStatus(400);

    // Авториазція або логін-пароль або токен
    const resUser = loginToken 
        ? await _usersAuth.loginByJWT(loginToken)
        : await _usersAuth.login(loginEmail, loginPassword); 
    if (!resUser) return res.json({isLogin:false});

    // генерація токена, якщо авторизація логін-пароль
    const token = !loginToken
                    ? _usersAuth.createJWT(resUser) || ''
                    : loginToken;      
                    
    // Зберігаємо токен в БД для користувача
    if (!loginToken) await _usersAuth.JWT2User(resUser.ID, token);

    // Отримуємо свічки користувача
    const candles = await _heroCandle.getByUserId(resUser.ID);

    // відповідь авторизації
    res.json({
        isLogin:true,
        user:{...resUser, candles},
        token:token
    })    
}) 


// Авторизація через Google
router.post('/google', 
    async (req: Request, res: Response) => {
    
    // отримуємо дані від google
    const userFromGoogle = await getUserFromGoogle(req.body.accessToken)
    if (!userFromGoogle) return res.sendStatus(403);

    // авторизовуємо без пароля
    let resUser = await _usersAuth.login(userFromGoogle.email, null, true);

    // Проводимо реєстрацію, якщо користувача немає в базі
    //if (!resUser) { 
        const userExist = await _user.getUserFullByEmail(userFromGoogle.email);
        if (userExist?.ban === 1 ) return res.sendStatus(403);
        const resCreate = await _user.createUser({ 
            userName: `${userFromGoogle.given_name||''} ${userFromGoogle.family_name||''}`,
            userEmail: userFromGoogle.email,
            userStatus:USER_STATUS.ENABLE,
            userPicture: userFromGoogle.picture,
            ...req.body},false, userExist?.stat === USER_STATUS.ENABLE);  

        if (resCreate)
            resUser = await _usersAuth.login(userFromGoogle.email, null, true);
    //}
    
    // Якщо отримали користувача - Створюємо токен, записуємо його і повертаємо відповідь
    if (!resUser) return res.sendStatus(500);
    const token = _usersAuth.createJWT(resUser) || '';
    await _usersAuth.JWT2User(resUser.ID, token);

    // Отримуємо свічки користувача
    const candles = await _heroCandle.getByUserId(resUser.ID);

    res.json({
        isLogin:true,
        user:{...resUser, candles},
        token:token
    }) 
     

});

// вилогінення (видалення токена з БД)
router.post('/logout', async (req:Request,res:Response)=>{
    await _usersAuth.removeJWT(req.body.token);
    res.json({stat:true});
});

// Запит на відправку ОТП пароль (при відновленні та реєстрації)
router.post('/otp/send', await middleRecaptcha,
    async (req: Request<any, any, AuthRecoveryData>, res: Response) => {
    if (!req.body.email) return res.sendStatus(400);
    const result = await _usersAuth.otpCreate(req.body.email); 
    res.json({ otp: result });
});
 
// Перевірка ОТП пароля (при відновленні та реєстрації)
router.post('/otp/verify',  await middleRecaptcha,
    async (req: Request<any, any, AuthRecoveryData>, res: Response) => {
    if ((!req.body.email) || (!req.body.otp)) return res.sendStatus(400);
    const result = await _usersAuth.otpVerify(req.body.email, req.body.otp);
    res.json({ verify: result });
});

// зміна пароля
router.post('/password/change',  await middleRecaptcha,
    async (req: Request<any, any, AuthRecoveryData>, res: Response) => {
    if ((!req.body.email) || (!req.body.otp) || (!req.body.password)) return res.sendStatus(400);
    const result = await _usersAuth.setPassword(req.body.email, req.body.password, req.body.otp);
    res.json({ changed: result });
});

// Реєстрація користувача
router.post('/register', await middleRecaptcha,
    async (req: Request<any, any, AuthRegisterData>, res: Response) => {
    if ((typeof req.body.userName !== 'string') || (typeof req.body.userEmail !== 'string')) 
        return res.sendStatus(400);
    if (!validator.isEmail(req.body.userEmail)) return res.json({stat:API_USERS.USER_WRONG_EMAIL});
    const userExist = await _user.getUserFullByEmail(req.body.userEmail); 
    if (userExist?.ban === 1) return res.json({stat:API_USERS.USER_BLOCK});
    if (userExist?.stat === USER_STATUS.ENABLE) return res.json({stat:API_USERS.USER_EXISTS});
    const resCreate = await _user.createUser({...req.body, userStatus:USER_STATUS.ENABLE},false, userExist?.stat === USER_STATUS.ENABLE);  
    const resOtp = await _usersAuth.otpCreate(req.body.userEmail); 
    res.json({stat:resCreate!==null && resOtp});
});

 
export default router;