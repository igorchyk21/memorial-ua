import { HERO_POST_STAT, HERO_STAT, HeroBiographyItem, HeroBiographyType, HeroListRequestParams, HeroListResponse, HeroPostType, HeroShortType } from "@global/types";
import { apiGetHeroBiography, apiHeroDelete, apiHeroDeleteBio, apiHeroDeletePost, apiHeroGet, apiHeroGetPosts, apiHeroList, apiHeroSaveAbout, apiHeroSaveBio, apiHeroSavePost, apiHeroSetStatus, apiHeroSetStatusPost } from "../api/hero.api";
import { insertHeroBiographyItem } from "../helper/insertHeroBiographyItem";

export const heroList = async (params:HeroListRequestParams): Promise<HeroListResponse|null> => {
    return await apiHeroList(params);
}

export const heroGet = async (heroId:number, heroUrl:string, authToken?:string): Promise<HeroShortType|null> => {
    return await apiHeroGet(heroId, heroUrl, authToken);
}

export const heroSave = async (heroId:number, hero:HeroShortType): Promise<boolean|number> => {
    return await apiHeroSaveAbout(heroId, hero);
}

export const heroSetStatus = async (heroId:number, heroStatus:HERO_STAT): Promise<boolean> => {
    return await apiHeroSetStatus(heroId, heroStatus);
}

export const heroDelete = async (heroId:number): Promise<boolean> => {
    return await apiHeroDelete(heroId);
}

/**
 * HERO POST
 */
export const heroGetPosts = async (heroId:number): Promise<HeroPostType[]|null> => {
    return await apiHeroGetPosts(heroId);
}

export const heroSavePost = async (postId:number, post:HeroPostType): Promise<boolean> => {
    return await apiHeroSavePost(postId, post);
}

export const heroSetStatusPost = async (postId:number, postStatus:HERO_POST_STAT): Promise<boolean> => {
    return await apiHeroSetStatusPost(postId, postStatus);
}

export const heroDeletePost = async (postId:number): Promise<boolean> => {
    return await apiHeroDeletePost(postId);
}


/**
 * BIOGRAPHY 
 */

export const heroGetBiography = async (heroId:number, hero:HeroShortType): Promise<HeroBiographyType> => {
    const resBio = (await apiGetHeroBiography(heroId)) || [];
    const addDates = [
            {dt:hero.birth, title:'t_birth'}, 
            {dt:hero.mobilization, title:'t_mobilization'}, 
            {dt: hero.death, title:'t_death'}
    ]
    let newBio = [...resBio];
    addDates.forEach(dt => {
        newBio = insertHeroBiographyItem(newBio, {ID:0, heroId:hero.ID, ...dt, body:''})
    });
    return newBio;
}

export const heroSaveBio = async (biographyId:number, biographyItem:HeroBiographyItem): Promise<boolean> => {
    return await apiHeroSaveBio(biographyId, biographyItem);
}

export const heroDeleteBio = async (biographyId:number): Promise<boolean> => {
    return await apiHeroDeleteBio(biographyId);
}