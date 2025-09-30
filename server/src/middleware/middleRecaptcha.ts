import express, { Request, Response } from "express";
import { NextFunction } from "express";
import conf from "../config/conf.js";
import axios from "axios";

 

export const middleRecaptcha = async (req: Request, res: Response, next: NextFunction) => {

    const RECAPTCHA_SECRET_KEY = conf.captchaSecret || '';
    const token = req?.body?.reToken||'';

    if (!token) 
        return res.status(403).json({ message: 'reCAPTCHA токен не наданий.' });

    try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const params = new URLSearchParams();
        params.append('secret', RECAPTCHA_SECRET_KEY);
        params.append('response', token);

        const response = await axios.post(verifyUrl, params);
        const data = response.data;

        if (!data.success || data.score < 0.5) {
            return res.status(403).json({ message: 'Error reCAPTCHA' });
        }

        if (req.body.reCAPTCHA) req.body.reCAPTCHA = undefined;
        next();
    } catch (error) {
        console.error('Error reCAPTCHA:', error);
        res.status(500).json({ message: 'Error reCAPTCHA.' });
    }
};


