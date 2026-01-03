import express, { Application, Request, Response, NextFunction } from "express";
import _cors from "./cors/cors-options.js";
import _db from "./dbase.js";
import _user from "./user/users.js";
import _userAuth from "./user/auth.js";
import _content from "./content/content.js";
import _hero from "./hero/heroes.js";
import _heroBio from "./hero/biography.js";
import _heroPhoto from "./hero/photo.js";
import _heroVideo from "./hero/video.js";
import _heroAudio from "./hero/audio.js";
import _heroCandle from "./hero/candle.js"
import _heroSubscription from "./hero/subscription.js";

import cors from "cors";
 
import { middleAuthToken } from "../middleware/middleAuthToken.js";

import routerAuth from "../routers/auth.js";
import routerContent from "../routers/content.js";
import routerGetHero from "../routers/heroes/get-heroes.js"
import routerPostHero from "../routers/heroes/post-heroes.js"
import routerDeleteHero from "../routers/heroes/del-heroes.js"
import routerFiles from "../routers/files.js";
import { wrapAsync } from "./helpers/functions/wrapAsync.js";

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
      
    app.get(/.*/, ( (req:Request,res:Response,next:NextFunction)=>{ console.log('\x1b[32m GET    \x1b[0m', req.path); setTimeout(() => { next() }, 0); }))
    app.post(/.*/, ( (req:Request,res:Response,next:NextFunction)=>{ console.log('\x1b[33m POST   \x1b[0m', req.path); setTimeout(() => { next() }, 0); }))
    app.delete(/.*/, ( (req:Request,res:Response,next:NextFunction)=>{ console.log('\x1b[31m DELETE \x1b[0m', req.path); setTimeout(() => { next() }, 0); }))


    app.use('/api/v1/auth',  wrapAsync(middleAuthToken), routerAuth);
    app.use('/api/v1/content', wrapAsync(middleAuthToken), routerContent);
    app.use('/api/v1/hero', wrapAsync(middleAuthToken), routerGetHero);
    app.use('/api/v1/hero', wrapAsync(middleAuthToken), routerPostHero);
    app.use('/api/v1/hero', wrapAsync(middleAuthToken), routerDeleteHero);
    app.use('/api/v1/files', wrapAsync(middleAuthToken), routerFiles );

};
 
export const initDataBase = (): void => {
    const conn = _db.conn();
    const connStat = _db.connStat();

    // Основні модулі сервера
    _cors.setConn(conn);
     
    _userAuth.setConn(conn); 
    _user.setConn(conn); 
    _content.setConn(conn); 
    _hero.setConn(conn);
    _heroBio.setConn(conn);
    _heroPhoto.setConn(conn);
    _heroVideo.setConn(conn);
    _heroAudio.setConn(conn);
    _heroCandle.setConn(conn)
    _heroSubscription.setConn(conn)
}



