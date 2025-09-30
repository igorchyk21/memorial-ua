import { Request, Response, NextFunction } from 'express';
import _usersAuth from "../modules/user/auth.js";
 
/**
 * Авторизаційний мідлвар
 */
export const middleAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers?.authorization;
    const authToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!authToken) return next();
    try {
        const user = await _usersAuth.loginByJWT(authToken);
        if (user !== null) req.user = user;
    } finally {
        next() 
    } 
};

