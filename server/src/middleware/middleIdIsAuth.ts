import { NextFunction, Request, Response } from "express";

export const middleIdIsAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.ID) return res.sendStatus(403);
    next();
}
