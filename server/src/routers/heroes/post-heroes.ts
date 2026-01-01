import express, { Request, Response } from "express";
import _hero from "../../modules/hero/heroes.js";
import _heroBio from "../../modules/hero/biography.js";
import _heroPhoto from "../../modules/hero/photo.js";
import { middleIsAdmin } from "../../middleware/middleIdAdmin.js";
import { safeIntParse, safeJSONParse } from "../../modules/helpers/gim-beckend-helpers.js";
import { zHeroShortSchema } from "../../modules/hero/schema/hero.js";
import { zHeroPostSchema } from "../../modules/hero/schema/post.js";
import { lengthWords } from "../../modules/helpers/stringHelper.js";
import { zHeroBiographyItemSchema } from "../../modules/hero/schema/biography.js";
import { wrapAsync } from "../../modules/helpers/functions/wrapAsync.js";
import { middleRecaptcha } from "../../middleware/middleRecaptcha.js";
import { HERO_POST_STAT, HERO_VIDEO_STAT } from "@global/types";
import _heroVideo from "../../modules/hero/video.js";

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

// Створення Гуроя
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