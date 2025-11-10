import express, { Request, Response} from "express";
import middleUpload from "../middleware/middleUpload.js";
import _heroPhoto from "../modules/hero/photo.js";
import { middleIdIsAuth } from "../middleware/middleIdIsAuth.js";
import { safeIntParse } from "../modules/helpers/gim-beckend-helpers.js";
import { HERO_PHOTO_STAT } from "@global/types";
import { middleRecaptcha } from "../middleware/middleRecaptcha.js";

const router = express.Router();
 
// Завантаження фотографій Героя
router.post(`/hero/photo/:heroId`, middleRecaptcha, middleUpload, async (req, res) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');

    let fileArray: Express.Multer.File[] = [];
    if (Array.isArray(req.files)) fileArray = req.files;
    else if (req.files && Array.isArray(req.files.files)) 
        fileArray = req.files.files;
    
    if (fileArray.length === 0) {
        return res.status(400).send('No files uploaded');
    }

    const filePaths = fileArray.map(f => f.path);
    const photoStatus = req.user?.admin ? HERO_PHOTO_STAT.ACTIVE : HERO_PHOTO_STAT.PENDING;
    const resPhoto = await _heroPhoto.add(heroId, req.user?.ID || 0, filePaths, photoStatus);
    res.json({stat:resPhoto, files:filePaths});
});


export default router;