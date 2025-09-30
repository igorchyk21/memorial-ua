import express, { Application, Request, Response, NextFunction } from "express";
import _cors from "./cors/cors-options.js";
import _db from "./dbase.js";
import _user from "./user/users.js";
import _userAuth from "./user/auth.js";

import cors from "cors";
 
//import { middleLang } from "../middleware/middleLang.js";
import { wrapAsync } from "./helpers/functions/wrapAsync.js";
import { middleAuthToken } from "../middleware/middleAuthToken.js";

import routerAuth from "../routers/auth.js";

export const startPoint = (app: Application): void => {

    app.use(/.*/,  
        
            (_req: Request, _res: Response, next: NextFunction) => {

                setTimeout(() => {
                    next();
                }, 0);

    });

    // cors політика
    app.use(cors(_cors.corsOptions), async (_req: Request, _res: Response, next: NextFunction) => {
        next();
    });
};

export const initRoutes = (app: Application): void => {
      
   app.get(/.*/, ( (req:Request,res:Response,next:NextFunction)=>{
       console.log('GET', req.path);
       setTimeout(() => { next() }, 0); }))

   app.post(/.*/, ( (req:Request,res:Response,next:NextFunction)=>{
       console.log('POST', req.path);
       setTimeout(() => { next() }, 0); }))

    app.use('/api/v1/auth', middleAuthToken, routerAuth);

};

export const initDataBase = (): void => {
    const conn = _db.conn();
    const connStat = _db.connStat();

    // Основні модулі сервера
    _cors.setConn(conn);
     
    _userAuth.setConn(conn); 
    _user.setConn(conn); 
     
}



