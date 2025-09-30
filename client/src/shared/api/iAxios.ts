import axios from 'axios';
import conf from '../config/conf';

 

// Встановлюємо базовий шлях до АРІ
const iAxios = axios.create({ baseURL: conf.apiUrl});
iAxios.defaults.headers.common['Content-Type'] = 'application/json'
iAxios.defaults.timeout                          = 10000;   
iAxios.defaults.headers.common[`X-Custom-Header`]= `econtent`;  
iAxios.defaults.withCredentials = true;


// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
  
iAxios.interceptors.request.use(
    async (config) => {
        const accessToken = (typeof window !== 'undefined') ? localStorage.getItem('authToken') : null ;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
 
// Встановлюэмо заголовок - локаль АРІ запитів - викликається на самому верзньому рівні у макеті app/layout.js
export function setLocaleHeader(locale:string) { 
    iAxios.defaults.headers.common['Accept-Language'] = locale; 
}

export default iAxios;

