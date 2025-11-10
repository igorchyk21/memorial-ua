import express, { Request, Response } from "express";
import _hero from "../../modules/hero/heroes.js";
import _heroBio from "../../modules/hero/biography.js";
import _heroPhoto from "../../modules/hero/photo.js";
import { zHeroListRequestParamsSchema } from "../../modules/hero/schema/list.js";
import { safeIntParse, safeJSONParse } from "../../modules/helpers/gim-beckend-helpers.js";
import { HERO_STAT } from "@global/types";
const router = express.Router();


// Повертає список Героїв
router.get('/list', async (req:Request, res:Response) => {
    const query = zHeroListRequestParamsSchema.safeParse(req.query);
    if (!query.success) {
        console.log(query)
        return res.status(400).send(safeJSONParse(query.error.message));
    }
    const status = req.user?.admin ? [HERO_STAT.ACTIVE, HERO_STAT.PENDING, HERO_STAT.REJECT] : [HERO_STAT.ACTIVE];
    res.json({... await _hero.getList( { ...query.data||{}, status} )})  
}) 
 
// Повертає дописи Героя
router.get('/posts/:heroId', async (req:Request, res:Response)=>{
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resPosts = await _hero.getPosts(heroId);
    res.json(resPosts);
}) 

// Повертає біографію Героя
router.get('/biography/:heroId', async (req:Request, res:Response)=> {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resBio = await _heroBio.get(heroId);
    res.json(resBio)
})

// Повертає фотографії героя
router.get('/photos/:heroId', async (req:Request, res:Response) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resPhoto = await _heroPhoto.get(heroId);
    res.json(resPhoto) 
})

// Повертає фотографію героя по її ID
router.get('/photo/:photoId', async (req:Request, res:Response) => {
    const photoId = safeIntParse(req.params.photoId, null);
    if (!photoId) return res.status(400).send('Incorrect parameter "photoId"');
    const resPhoto = await _heroPhoto.get(null,photoId);
    res.json(resPhoto?.[0]||null) 
})


// Повертає Героя
router.get('/:heroId', async (req:Request, res:Response) => { 
    const status = (req.user?.admin || req.query.force) ? [-1,0,1] : undefined;
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resHero = await _hero.getList({status}, heroId);
    if (!resHero?.heroes?.[0]) return res.status(404).send('Hero Not Found');
    res.json(resHero?.heroes?.[0])
})  

export default router; 