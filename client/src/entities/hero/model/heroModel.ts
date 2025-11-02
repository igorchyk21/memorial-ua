import { HeroListRequestParams, HeroListResponse, HeroShortType } from "@global/types";
import { apiHeroGet, apiHeroList } from "../api/hero.api";

export const heroList = async (params:HeroListRequestParams): Promise<HeroListResponse|null> => {
    return await apiHeroList(params);
}

export const heroGet = async (heroId:number, heroUrl:string): Promise<HeroShortType|null> => {
    return await apiHeroGet(heroId, heroUrl);
}