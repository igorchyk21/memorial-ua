import { HeroListRequestParams, HeroListResponse } from "@global/types";
import { apiHeroList } from "../api/hero.api";

export const heroList = async (params:HeroListRequestParams): Promise<HeroListResponse|null> => {
    return await apiHeroList(params);
}