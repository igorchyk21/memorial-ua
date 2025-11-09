/**
 * Cors мідл для статичних фалйів 
 */

import { NextFunction, Request, Response } from "express";

export const middleCorsDataStatic = (req: Request, res: Response, next: NextFunction) => {
    const origin = req?.headers?.origin||'';

    /*
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } */

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

 
