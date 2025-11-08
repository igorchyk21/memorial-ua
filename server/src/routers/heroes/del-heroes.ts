import express, { Request, Response } from "express";
import _hero from "../../modules/hero/heroes.js";
import _heroBio from "../../modules/hero/biography.js";
import { middleIsAdmin } from "../../middleware/middleIdAdmin.js";
import { safeIntParse } from "../../modules/helpers/gim-beckend-helpers.js";
const router = express.Router();

// Видалення допису Героя
router.delete('/post/:postId', async (req:Request, res:Response) => {
    if (!req.user) return res.sendStatus(403);
    const postId = safeIntParse(req.params.postId, null);
    if (!postId) return res.status(400).send('Incorrect parameter "postId"');
    // Якщо адмін - не передаємо ІД користувача, якщо ні - передаємо ІД користувача для ідентифікації
    const resDel = await _hero.deletePost(postId, !req.user.admin ? req.user.ID : undefined);
    res.json({stat:resDel})
})
 
// Збереження або додавання пункту біографії
router.delete('/biography/:biographyId', middleIsAdmin, async (req:Request, res:Response) => {
    const biographyId = safeIntParse(req.params.biographyId, null);
    if (!biographyId) return res.status(400).send('Incorrect parameter "biographyId"');
    res.json({stat: await _heroBio.deleteBio(biographyId)});
})

// Видалення Героя
router.delete('/:heroId', middleIsAdmin, async (req:Request, res:Response) =>{ 
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');
    const resDel = await _hero.deleteMark(heroId);
    res.json({stat:resDel}); 
}) 

 
 
export default router;     