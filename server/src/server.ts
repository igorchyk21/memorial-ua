import express, { NextFunction } from "express";
import http from "http";
import path from "path";
import conf from "./config/conf.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import _cors from "./modules/cors/cors-options.js";
import { startPoint, initRoutes, initDataBase } from "./modules/init.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
//import { middleCorsDataStatic } from "./middleware/middleCorsDataStatic.js";

// Потрібно для заміни __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
// Створення додатку
const app = express();
const server = http.createServer(app);

app.use(session({
    secret: 'emettsec',
    resave: false,      
    saveUninitialized: false, // Рекомендується для продуктивності 
}));
 
initDataBase();
       
app.use(cookieParser());  
app.use(express.static('public')); // Папка статичних ресурсів
app.use('/data', express.static('data')); // Папка статичних ресурсів
app.use('/modules', express.static(path.join(__dirname, 'node_modules'))); // маршрут до папки з модулями
app.use(express.json({ limit: '100mb' }));
app.use(express.json({ type: 'application/json', limit: '50mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.options(/.*/, cors(_cors.corsOptions)); // АРІ сайту
  
startPoint(app);
initRoutes(app);


// Запуск сервера
server.listen(conf.port, () => {
    console.log(`memorialUA Start Server on Port: ${conf.port}`);
    console.log('===========================\n');
    console.log('\n');
}); 

