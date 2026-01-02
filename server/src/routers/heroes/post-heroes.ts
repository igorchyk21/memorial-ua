import express, { Request, Response } from "express";
import _hero from "../../modules/hero/heroes.js";
import _heroBio from "../../modules/hero/biography.js";
import _heroPhoto from "../../modules/hero/photo.js";
import { middleIsAdmin } from "../../middleware/middleIdAdmin.js";
import { safeIntParse, safeJSONParse } from "../../modules/helpers/gim-beckend-helpers.js";
import { zHeroShortSchema } from "../../modules/hero/schema/hero.js";
import { zHeroCandleSchema, zHeroPostSchema } from "../../modules/hero/schema/post.js";
import { lengthWords } from "../../modules/helpers/stringHelper.js";
import { zHeroBiographyItemSchema } from "../../modules/hero/schema/biography.js";
import { wrapAsync } from "../../modules/helpers/functions/wrapAsync.js";
import { middleRecaptcha } from "../../middleware/middleRecaptcha.js";
import { HERO_AUDIO_STAT, HERO_POST_STAT, HERO_VIDEO_STAT } from "@global/types";
import _heroVideo from "../../modules/hero/video.js";
import _heroAudio from "../../modules/hero/audio.js";
import _heroCandle from "../../modules/hero/candle.js";

const router = express.Router();

// Зміна статусу Героя
router.post('/status/:heroId', middleIsAdmin, async (req:Request, res:Response) =>{ 
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const heroStatus = safeIntParse(req.body.heroStatus, null);
    if (heroStatus === null) return res.status(400).send('Incorrect body parameter "heroStatus"');
    const resStat = await _hero.setStatus(heroId, heroStatus);
    res.json({stat:resStat}); 
}) 

// Збереження допису
router.post('/post/:postId',  wrapAsync(middleRecaptcha),  async (req:Request, res:Response)=>{
    const postId = safeIntParse(req.params.postId, null);
    if (postId === null) return res.status(400).send('Incorrect parameter "postId"');
    let resSave = null;

    const l = lengthWords(req.body?.post?.body||'');
    if (!((l>=10) && (l<=200))) return res.status(400).send('Incorrect parameter "post.body"');

    // Свторення
    if (postId === 0) {
        const body = zHeroPostSchema.safeParse(req.body.post);
        if (!body.success) { console.log(body); return res.status(400).send(safeJSONParse(body.error.message));}
        const postStatus = req.user?.admin ? HERO_POST_STAT.ACTIVE : HERO_POST_STAT.PENDING;
        resSave = await _hero.createPost(body.data, postStatus); 
    } 
    
    // Збереження
    else {
        if (!req.user?.admin) return res.sendStatus(403);
        const postBody = req.body?.post?.body;
        if (!postBody) return res.status(400).send('Incorrect body parameter "post.body"');
        resSave = await _hero.savePost(postId, postBody);
    }
    
    res.json({stat:resSave});
})

// Зміна статусу допису
router.post('/post/status/:postId', middleIsAdmin, async (req:Request, res:Response) =>{
    const postId = safeIntParse(req.params.postId, null);
    if (!postId) return res.status(400).send('Incorrect parameter "postId"');
    const postStatus = safeIntParse(req.body.postStatus, null);
    if (postStatus === null) return res.status(400).send('Incorrect body parameter "postStatus"');
    const resStat = await _hero.setStatusPost(postId, postStatus);
    res.json({stat:resStat});

})

// Збереження або додавання пункту біографії
router.post('/biography/:biographyId', middleIsAdmin, async (req:Request, res:Response) => {
    const biographyId = safeIntParse(req.params.biographyId, null);
    if (biographyId === null) return res.status(400).send('Incorrect parameter "biographyId"');

    const body = zHeroBiographyItemSchema.safeParse(req.body.biographyItem);

    if (!body.success) {
        console.log(body)
        return res.status(400).send(safeJSONParse(body.error.message));
    }

    // Створення
    if (biographyId === 0) 
        res.json({stat: await _heroBio.create(body.data)})

    // Збереження
    else res.json({stat: await _heroBio.save(biographyId, body.data)})
})


// Сортує фотографії
router.post('/photo/sorted/:heroId', middleIsAdmin, async(req:Request, res:Response) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const sortedIds = req.body.sortedIds;
    if (!Array.isArray(sortedIds)) res.status(400).send('Incorrect body parameter "sortedIds"');
    const resSort = await _heroPhoto.sorted(heroId, sortedIds);
    res.json({stat:resSort});
})

// Завантаження фото профіля фахівця
router.post('/photo/base64/:heroId', middleIsAdmin, async (req:Request, res:Response)=>{ 
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const imgData = req.body.imgData||'';
    if (!imgData.startsWith('data:image')) return res.sendStatus(400);
    const resSetMain = await _heroPhoto.setMainPhoto(heroId, imgData);
    res.json({stat:resSetMain})
})

// Зміна статусу фотографії
router.post('/photo/status/:photoId', middleIsAdmin, async (req:Request, res:Response)=>{
    const photoId = safeIntParse(req.params.photoId, null);
    if (!photoId) return res.status(400).send('Incorrect parameter "photoId"');
    const photoStatus = safeIntParse(req.body.photoStatus, null);
    if (photoStatus === null) return res.status(400).send('Incorrect body parameter "photoStatus"');
    const resStat = await _heroPhoto.setStatus(photoId, photoStatus); 
    res.json({stat:resStat});
})

// Зміна опису відео
router.post('/video/description/:videoId', middleIsAdmin, async (req:Request, res:Response)=>{
    const videoId = safeIntParse(req.params.videoId, null);
    if (!videoId) return res.status(400).send('Incorrect parameter "videoId"');
    const description = req.body.description || '';
    const resDescription = await _heroVideo.setDescription(videoId, description);
    res.json({stat:resDescription});
})

// Додавання відео з YouTube
router.post('/video/youtube/:heroId', middleRecaptcha, async (req:Request, res:Response)=>{
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const videoUrl = req.body.videoUrl;
    if (!videoUrl) return res.status(400).send('Incorrect body parameter "videoUrl"');
    const description = req.body.description || '';
    const resVideo = await _heroVideo.add(heroId, req.user?.ID || 0, [videoUrl], description, HERO_VIDEO_STAT.PENDING);
    res.json({stat:resVideo});
})

// Сортування відео
router.post('/video/sorted/:heroId', middleIsAdmin, async(req:Request, res:Response) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const sortedIds = req.body.sortedIds;
    if (!Array.isArray(sortedIds)) res.status(400).send('Incorrect body parameter "sortedIds"');
    const resSort = await _heroVideo.sorted(heroId, sortedIds);
    res.json({stat:resSort});
})

// Зміна статусу відео
router.post('/video/status/:videoId', middleIsAdmin, async (req:Request, res:Response)=>{
    const videoId = safeIntParse(req.params.videoId, null);
    if (!videoId) return res.status(400).send('Incorrect parameter "videoId"');
    const videoStatus = safeIntParse(req.body.videoStatus, null);
    if (videoStatus === null) return res.status(400).send('Incorrect body parameter "videoStatus"');
    const resStat = await _heroVideo.setStatus(videoId, videoStatus);
    res.json({stat:resStat});
})

// Додавання аудіо з зовнішнього джерела
router.post('/audio/link/:heroId', middleRecaptcha, async (req:Request, res:Response)=>{
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const audioUrl = req.body.audioUrl;
    if (!audioUrl) return res.status(400).send('Incorrect body parameter "audioUrl"');
    const description = req.body.description || '';
    const resAudio = await _heroAudio.add(heroId, req.user?.ID || 0, [audioUrl], description, HERO_AUDIO_STAT.PENDING);
    res.json({stat:resAudio});
})


// Зміна опису аудіо
router.post('/audio/description/:audioId', middleIsAdmin, async (req:Request, res:Response)=>{
    const audioId = safeIntParse(req.params.audioId, null);
    if (!audioId) return res.status(400).send('Incorrect parameter "audioId"');
    const description = req.body.description || '';
    const resDescription = await _heroAudio.setDescription(audioId, description);
    res.json({stat:resDescription});
})

// Сортування аудіо
router.post('/audio/sorted/:heroId', middleIsAdmin, async(req:Request, res:Response) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const sortedIds = req.body.sortedIds;
    if (!Array.isArray(sortedIds)) res.status(400).send('Incorrect body parameter "sortedIds"');
    const resSort = await _heroAudio.sorted(heroId, sortedIds);
    res.json({stat:resSort});
})  

// Зміна статусу аудіо
router.post('/audio/status/:audioId', middleIsAdmin, async (req:Request, res:Response)=>{
    const audioId = safeIntParse(req.params.audioId, null);
    if (!audioId) return res.status(400).send('Incorrect parameter "audioId"');
    const audioStatus = safeIntParse(req.body.audioStatus, null);
    if (audioStatus === null) return res.status(400).send('Incorrect body parameter "audioStatus"');
    const resStat = await _heroAudio.setStatus(audioId, audioStatus);
    res.json({stat:resStat});
})

// Створення Героя
router.post('/create', middleRecaptcha, async (req:Request, res:Response)=> {
    const body = zHeroShortSchema.safeParse(req.body.hero);
    if (!body.success) {
        console.log(body)
        return res.status(400).send(safeJSONParse(body.error.message));
    }
    const resId = await _hero.create(body.data);
    if (!resId) return res.sendStatus(500);
    const resSave = await _hero.save({...body.data, ID:resId})
    res.json({id:resSave ? resId : false})
})

// Додавання свічки Герою
router.post('/candle/:heroId', middleRecaptcha, async (req:Request, res:Response)=>{
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const body = zHeroCandleSchema.safeParse(req.body.candle);
    if (!body.success) {
        console.log(body)
        return res.status(400).send(safeJSONParse(body.error.message));
    }
    const resCandle = await _heroCandle.add(heroId, body.data);
    res.json({stat:Boolean(resCandle), expiries:resCandle});
})      

// Збереження Героя
router.post('/:heroId', middleIsAdmin, async (req:Request, res:Response)=>{
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const body = zHeroShortSchema.safeParse(req.body.hero);
    if (!body.success) {
        console.log(body)
        return res.status(400).send(safeJSONParse(body.error.message));
    }
    const resSave = _hero.save(body.data); 
    res.json({id:resSave});
})


export default router;  