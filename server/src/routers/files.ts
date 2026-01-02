import express, { Request, Response} from "express";
import middleUpload from "../middleware/middleUpload.js";
import _heroPhoto from "../modules/hero/photo.js";
import _heroVideo from "../modules/hero/video.js";
import { middleIdIsAuth } from "../middleware/middleIdIsAuth.js";
import { safeIntParse } from "../modules/helpers/gim-beckend-helpers.js";
import { HERO_AUDIO_STAT, HERO_PHOTO_STAT, HERO_VIDEO_STAT } from "@global/types";
import { middleRecaptcha } from "../middleware/middleRecaptcha.js";
import { middleIsAdmin } from "../middleware/middleIdAdmin.js";
import _heroAudio from "../modules/hero/audio.js";

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


 
// Завантаження фотографій Героя
router.post(`/hero/video/:heroId`, middleIsAdmin, middleRecaptcha, middleUpload, async (req, res) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');

    let fileArray: Express.Multer.File[] = [];
    if (Array.isArray(req.files)) fileArray = req.files;
    else if (req.files && Array.isArray(req.files.files)) 
        fileArray = req.files.files;
    
    if (fileArray.length === 0) {
        return res.status(400).send('No files uploaded');
    }
    const description = req.body.description || '';
 
    const filePaths = fileArray.map(f => f.path);
    const videoStatus = req.user?.admin ? HERO_VIDEO_STAT.ACTIVE : HERO_VIDEO_STAT.PENDING;
    const resVideo = await _heroVideo.add(heroId, req.user?.ID || 0, filePaths, description, videoStatus); 
    res.json({stat:resVideo, files:filePaths});
});


// Завантаження аудіо Героя
router.post(`/hero/audio/:heroId`, middleIsAdmin, middleRecaptcha, middleUpload, async (req, res) => {
    const heroId = safeIntParse(req.params.heroId, null);
    if (!heroId) return res.status(400).send('Incorrect parameter "heroId"');

    let fileArray: Express.Multer.File[] = [];
    if (Array.isArray(req.files)) fileArray = req.files;
    else if (req.files && Array.isArray(req.files.files)) 
        fileArray = req.files.files;
    
    if (fileArray.length === 0) {
        return res.status(400).send('No files uploaded');
    }
    const description = req.body.description || '';
 
    const filePaths = fileArray.map(f => f.path);
    const audioStatus = req.user?.admin ? HERO_AUDIO_STAT.ACTIVE : HERO_AUDIO_STAT.PENDING;
    const resAudio = await _heroAudio.add(heroId, req.user?.ID || 0, filePaths, description, audioStatus); 
    res.json({stat:resAudio, files:filePaths});
});





export default router;