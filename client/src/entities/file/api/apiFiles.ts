import iAxios from "@shared/api/iAxios";
import { AxiosProgressEvent } from "axios";

export const apiUploadFiles = async (formData:FormData, onUploadProgress:((progressEvent: AxiosProgressEvent) => void) | null, path?:string)
    :Promise<{stat:boolean, files:string[]}|null> => {
    try {  
        // Запит до сервера з відвантаженням файлів
        const response = await iAxios.post(`files/${path ? path : 'upload'}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            }, 
            onUploadProgress: onUploadProgress ? onUploadProgress : undefined
            
        }); 
        return response.data||false;
    } catch (error) {
        console.log(error);
        return null;
    }
}