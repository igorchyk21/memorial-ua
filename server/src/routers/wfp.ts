import express, { Request, Response} from "express";
 import _wfp from "../modules/wfp/wfp.js";
import { safeJSONParse } from "../modules/helpers/gim-beckend-helpers.js";

const router = express.Router();

router.post('/hook', async (req:Request, res:Response) => {
    try {
        const jsonString = Object.keys(req.body as Record<string, any>)?.[0]||'';
        const wfpJson = safeJSONParse(jsonString, {});
        console.log(wfpJson);
        await _wfp.payment2Base(wfpJson); 
        await _wfp.processing(wfpJson);
        const answer = await _wfp.answer(wfpJson);
        if (!answer) return res.status(500).send('Error answer')
        res.json(answer);
    } catch(e){
        console.log(e); 
        res.sendStatus(500);
    }
});

router.post('/return', async (req:Request, res:Response) => {
    const url = req.query.url as string;
    if (url) res.redirect(url);
        else res.status(400).send('No url');
});

export default router;