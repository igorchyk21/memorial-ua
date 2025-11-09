import { AxiosProgressEvent } from "axios";
import { apiUploadFiles } from "../api/apiFiles";

export const uploadFiles = async (files:File[], onUploadProgress:((progressEvent: AxiosProgressEvent) => void)|null, path?:string) => {

    if (!files?.length) return;
      
    // Формуємо форму файлів з масиву файлів для відвантаження
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]); // Додаємо кожен файл до FormData
    } 
    return await apiUploadFiles(formData, onUploadProgress, path) 
}
 