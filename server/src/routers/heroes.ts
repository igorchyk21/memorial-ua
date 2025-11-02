import express, { Request, Response } from "express";
import _hero from "../modules/hero/heroes.js";
import { zHeroListRequestParamsSchema } from "../modules/hero/schema/list.js";
import { safeIntParse, safeJSONParse } from "../modules/helpers/gim-beckend-helpers.js";
const router = express.Router();

router.get('/list', async (req:Request, res:Response) => {
    const query = zHeroListRequestParamsSchema.safeParse(req.query);
    if (!query.success) return res.status(400).send(safeJSONParse(query.error.message));
    res.json({... await _hero.getList(query.data||{})}) 
})

router.get('/:heroId', async (req:Request, res:Response) => { 
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resHero = await _hero.getList({}, heroId);
    if (!resHero?.heroes?.[0]) return res.status(404).send('Hero Not Found');
    res.json(resHero?.heroes?.[0])
}) 

export default router;