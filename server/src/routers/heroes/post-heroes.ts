import express, { Request, Response } from "express";
import _hero from "../../modules/hero/heroes.js";
import { middleIsAdmin } from "../../middleware/middleIdAdmin.js";
import { safeIntParse, safeJSONParse } from "../../modules/helpers/gim-beckend-helpers.js";
import { zHeroShortSchema } from "../../modules/hero/schema/hero.js";
import { zHeroPostSchema } from "../../modules/hero/schema/post.js";
import { lengthWords } from "../../modules/helpers/stringHelper.js";
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

// Збереження допису
router.post('/post/:postId', async (req:Request, res:Response)=>{
    const postId = safeIntParse(req.params.postId, null);
    if (postId === null) return res.status(400).send('Incorrect parameter "postId"');
    let resSave = null;

    const l = lengthWords(req.body?.post?.body||'');
    if (!((l>=10) && (l<=200))) return res.status(400).send('Incorrect parameter "post.body"');

    // Свторення
    if (postId === 0) {
        const body = zHeroPostSchema.safeParse(req.body.post);
        if (!body.success) { console.log(body); return res.status(400).send(safeJSONParse(body.error.message));}
        resSave = await _hero.createPost(body.data);
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

// Зміна статусу
router.post('/post/status/:postId', middleIsAdmin, async (req:Request, res:Response) =>{
    const postId = safeIntParse(req.params.postId, null);
    if (!postId) return res.status(400).send('Incorrect parameter "postId"');
    const postStatus = safeIntParse(req.body.postStatus, null);
    if (postStatus === null) return res.status(400).send('Incorrect body parameter "postStatus"');
    const resStat = await _hero.setStatusPost(postId, postStatus);
    res.json({stat:resStat});

})

export default router;  