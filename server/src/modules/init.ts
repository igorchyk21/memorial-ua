import express, { Application, Request, Response, NextFunction } from "express";
import _cors from "./cors/cors-options.js";
import _db from "./dbase.js";
import _user from "./user/users.js";
import _userAuth from "./user/auth.js";
import _content from "./content/content.js";
import _hero from "./hero/heroes.js";

import cors from "cors";
 
import { middleAuthToken } from "../middleware/middleAuthToken.js";

import routerAuth from "../routers/auth.js";
import routerContent from "../routers/content.js";
import routerHero from "../routers/heroes.js"

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
    app.use('/api/v1/content', routerContent);
    app.use('/api/v1/hero', routerHero);

};

export const initDataBase = (): void => {
    const conn = _db.conn();
    const connStat = _db.connStat();

    // Основні модулі сервера
    _cors.setConn(conn);
     
    _userAuth.setConn(conn); 
    _user.setConn(conn); 
    _content.setConn(conn); 
    _hero.setConn(conn)

     
}



