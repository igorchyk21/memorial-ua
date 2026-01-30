import express, { Request, Response} from "express";
import { safeIntParse } from "../modules/helpers/gim-beckend-helpers.js";
import _notification from "../modules/notification/notification.js";
import { middleIsAdmin } from "../middleware/middleIdAdmin.js";

const router = express.Router();

// отримання списку нотифікацій
router.get('/list',  middleIsAdmin, async (req:Request, res:Response) => {
    const notifications = await _notification.getNotifications();
    res.json({items:notifications});
});

// позначення нотифікації як прочитаної
router.post('/read/:notificationId',  middleIsAdmin, async (req:Request, res:Response) => {
    const notificationId = safeIntParse(req.params.notificationId, null);
    if (!notificationId) return res.status(400).send('Incorrect parameter "notificationId"');
    const resRead = await _notification.markAsRead(notificationId, req.user?.ID || 0);

    res.json({stat:resRead});
});

export default router;