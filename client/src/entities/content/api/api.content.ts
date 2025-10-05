import iAxios from "@/shared/api/iAxios";
import { ContentBaseType } from "@global/types";


export const apiContent4Page = async <T>(page:string): Promise<T|null> => {
    try {
        const r = await iAxios.get<T>(`/content/page/${page}`);
        return r.data;
    } catch(e){
        console.error(e)
        return null;
    }
}

export const apiContentBigSlider = async (): Promise<ContentBaseType[]|null> => {
    try {
        const r = await iAxios.get<ContentBaseType[]>('/content/bigslider');
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}