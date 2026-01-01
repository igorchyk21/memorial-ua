import { HERO_PHOTO_STAT, HERO_POST_STAT, HERO_STAT, HeroBiographyItem, HeroBiographyType, HeroListRequestParams, HeroListResponse, HeroPhotoItem, HeroPostType, HeroShortType } from "@global/types";
import { apiGetHeroBiography, apiHeroCreate, apiHeroDelete, apiHeroDeleteBio, apiHeroDeletePhoto, apiHeroDeletePost, apiHeroGet, apiHeroGetPhotoById, apiHeroGetPhotos, apiHeroGetPosts, apiHeroList, apiHeroSaveAbout, apiHeroSaveBio, apiHeroSavePost, apiHeroSetMainPhoto, apiHeroSetStatus, apiHeroSetStatusPhoto, apiHeroSetStatusPost, apiHeroSortedPhotos, apiHeroSendVideoToYouTube } from "../api/hero.api";
import { insertHeroBiographyItem } from "../helper/insertHeroBiographyItem";

export const heroList = async (params:HeroListRequestParams,  authToken?:string): Promise<HeroListResponse|null> => {
    return await apiHeroList(params, authToken);
}

export const heroGet = async (heroId:number, heroUrl:string, authToken?:string, force?:boolean): Promise<HeroShortType|null> => {
    return await apiHeroGet(heroId, heroUrl, authToken, force);
}

export const heroSave = async (heroId:number, hero:HeroShortType): Promise<boolean|number> => {
    return await apiHeroSaveAbout(heroId, hero);
}

export const heroCreate = async (hero:HeroShortType, reToken?:string|null): Promise<number|null> => { 
    return await apiHeroCreate(hero, reToken);
} 


export const heroSetStatus = async (heroId:number, heroStatus:HERO_STAT): Promise<boolean> => {
    return await apiHeroSetStatus(heroId, heroStatus);
}

export const heroDelete = async (heroId:number): Promise<boolean> => {
    return await apiHeroDelete(heroId);
}

/**
 * ДОПИСИ ГЕРОЯ
 */

export const heroGetPosts = async (heroId:number): Promise<HeroPostType[]|null> => {
    return await apiHeroGetPosts(heroId);
}

export const heroSavePost = async (postId:number, post:HeroPostType, reToken?:string|null): Promise<boolean> => {
    return await apiHeroSavePost(postId, post, reToken);
}

export const heroSetStatusPost = async (postId:number, postStatus:HERO_POST_STAT): Promise<boolean> => {
    return await apiHeroSetStatusPost(postId, postStatus);
}

export const heroDeletePost = async (postId:number): Promise<boolean> => {
    return await apiHeroDeletePost(postId);
}


/**
 * БІОГРАФІЯ ГЕРОЯ
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


/**
 * ФОТОГАЛЕРЕЯ ГЕРОЯ
 */

export const heroGetPhotos = async (heroId:number): Promise<HeroPhotoItem[]|null> => {
    return await apiHeroGetPhotos(heroId);
}

export const heroGetPhotoById = async (photoId:number): Promise<HeroPhotoItem|null> => {
    return await apiHeroGetPhotoById(photoId);
}


export const heroSorterPhotos = async (heroId:number, sortedIds:number[]): Promise<boolean> => {
    return await apiHeroSortedPhotos(heroId, sortedIds);
}

export const heroSetStatusPhoto = async (photoId:number, photoStatus:HERO_PHOTO_STAT): Promise<boolean> => {
    return await apiHeroSetStatusPhoto(photoId, photoStatus);
}

export const heroDeletePhoto = async (photoId:number): Promise<boolean> => {
    return await apiHeroDeletePhoto(photoId);
}


export const heroSetMainPhoto = async (photoId:number, imgData:string): Promise<boolean> => {
    return await apiHeroSetMainPhoto(photoId, imgData);
}


/**
 * ВІДЕО
 */

export const heroSendVideoToYouTube = async (heroId:number, videoUrl:string, description:string, reToken?:string|null): Promise<boolean> => {
    return await apiHeroSendVideoToYouTube(heroId, videoUrl, description, reToken);
}