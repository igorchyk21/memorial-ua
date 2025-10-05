import express, { Request, Response } from "express";
import _content from "../modules/content/content.js";

const router = express.Router();

router.get('/page/main', async (req:Request, res:Response)=> {
    const slides = await _content.getContent('bigslider');
    const about = await _content.getContent('about');
    const features = await _content.getContent('features');
    const formats = await _content.getContent('formats');
    const faq = await _content.getContent('faq');
    res.json({
        slides : slides,
        about: about?.[0]||null,
        features,
        formats,
        faq
    })
})

router.get('/bigslider', async (req:Request, res:Response)=> {
    const slides = await _content.getContent('bigslider');
    res.json(slides)
})

export default router;