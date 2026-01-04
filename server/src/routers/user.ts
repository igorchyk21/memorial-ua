import express, { Request, Response} from "express";
import _user from "../modules/user/users.js";
const router = express.Router();

router.delete('/unsubscription/:email', async (req:Request, res:Response) => {
    const email = req.params.email;
    if (!email) return res.status(400).send('Email is required');
    const resUser = await _user.getUserFullByEmail(email);
    if (!resUser) return res.status(400).send('User not found');
    const result = await _user.unsubscribeAll(resUser.ID); 
    res.json({stat:result});
});
 
export default router;