import iAxios from "@/shared/api/iAxios";
import { HeroListRequestParams, HeroListResponse, HeroShortType } from "@global/types";

export const apiHeroList = async (params:HeroListRequestParams): Promise<HeroListResponse|null> => {
    try {
        const r = await iAxios.get<HeroListResponse>('/hero/list',{params});
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}