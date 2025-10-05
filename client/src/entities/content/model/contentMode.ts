import { ContentBaseType, ContentPageMain } from "@global/types";
import { apiContent4Page, apiContentBigSlider } from "../api/api.content"

export const contentBigSlider = async (): Promise<ContentBaseType[]|null> => {
    return await apiContentBigSlider();
}

export const contentPageMain = async (): Promise<ContentPageMain|null> => {
    return await apiContent4Page<ContentPageMain>('main')
}