import express, { Request, Response } from "express";
import _hero from "../modules/hero/heroes.js";
import { zHeroListRequestParamsSchema } from "../modules/hero/schema/list.js";
import { safeJSONParse } from "../modules/helpers/gim-beckend-helpers.js";
const router = express.Router();

router.get('/list', async (req:Request, res:Response) => {
    const query = zHeroListRequestParamsSchema.safeParse(req.query);
    if (!query.success) return res.status(400).send(safeJSONParse(query.error.message));
    res.json({... await _hero.getList(query.data||{})})
})

router.get('/:heroId', async (req:Request, res:Response) => { 

})

export default router;