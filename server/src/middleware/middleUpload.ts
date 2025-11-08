/**
 * Модуль завантаження файлів в 
 * File Navigator-i
 */

import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { mkdirpSync } from "mkdirp";
import { Request } from "express";
import { getDateStamp } from "../modules/helpers/functions/getDateStamp.js";
import conf from "../config/conf.js";
import { v4 as uuidv4 } from "uuid";

// Оголошуємо інтерфейс для query (щоб req.query.path не був any)
interface UploadRequest extends Request {
  query: {
    path?: string;
    [key: string]: any;
  };  
}

const getPAth4File = (req:UploadRequest) => {
    const dataFolder = conf.dataFolder;
 
    let path4file:string;
    // завантаження з quill
    if (req.path.startsWith('/hero/photo')) path4file = path.join(dataFolder, `heroes/${req.params?.heroId}/gallery/photos`);
 
    // інші завантаження
    else path4file = path.join(dataFolder, `other/${req.user?.ID}`, getDateStamp());

    return path4file;
}



// Налаштування збереження файлів
const storage: StorageEngine = multer.diskStorage({
    destination: (req: UploadRequest, file:any, cb:any) => {
        if (!req.user?.ID) return cb('Not Authorization');
        try {
            const path4file = getPAth4File(req);
            mkdirpSync(path4file);
            cb(null, path4file); // Де зберігати файли
        } catch (e) {
            console.error(e);
            cb(e as Error, "");
        }
    },
    filename: (req: UploadRequest, file:any, cb:any) => {
        if (!req.user?.ID) return cb('Not Authorization');
        try {
            
            const path4file = getPAth4File(req);
            // Перекодовуємо ім’я
            file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");

            // генеруємо доступне ім’я файлу     
            const fileName = uuidv4(file.originalname)+'.webp';
            const safeName = Buffer.from(fileName, "utf8").toString("utf8");
            cb(null, safeName);
        } catch(e){
            console.error(e);
            cb(e as Error, "");
        }
    },
});

const middleUpload = multer({ storage }).fields([{ name: "files" }]);

export default middleUpload;
