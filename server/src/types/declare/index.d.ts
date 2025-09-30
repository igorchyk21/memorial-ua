import { EMeetLang, UserData } from '@emeet/types';
import 'express';
 
declare module 'express-serve-static-core' {
    interface Request {
        user?: UserData;
    }
}
