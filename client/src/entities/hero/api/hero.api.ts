import iAxios from "@/shared/api/iAxios";
import { HERO_PHOTO_STAT, HERO_POST_STAT, HERO_STAT, HeroBiographyItem, HeroBiographyType, HeroListRequestParams, HeroListResponse, HeroPhotoItem, HeroPostType, HeroShortType } from "@global/types";
import { isAbsolute } from "path";

// Повертає список Героїв
export const apiHeroList = async (params:HeroListRequestParams, authToken?:string): Promise<HeroListResponse|null> => {
    try {
        const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
        const r = await iAxios.get<HeroListResponse>('/hero/list',{params, headers});
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}

// Повертає одного Героя
export const apiHeroGet = async (heroId:number, heroUrl:string, authToken?:string, force?:boolean): Promise<HeroShortType|null> => {
    try {
        const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
        const r = await iAxios(`/hero/${heroId}`, {params:{heroUrl,force}, headers});
        return r.data;
    } catch(e){
        console.error(e);
        return null; 
    }
}

// Створення Героя
export const apiHeroCreate = async (hero:HeroShortType, reToken?:string|null): Promise<number|null> => {  
    try {
        const r = await iAxios.post('/hero/create', {hero, reToken});
        return r.data.id || null;
    } catch(e){
        console.error(e);
        return null;
    }
}

// Збереження Героя - About
export const apiHeroSaveAbout = async (heroId:number, hero:HeroShortType): Promise<boolean|number> => {
    try {
        const r = await iAxios.post(`/hero/${heroId}`, {hero});
        return r.data.id || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна статусу Героя
export const apiHeroSetStatus = async (heroId:number, heroStatus:HERO_STAT): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/status/${heroId}`, {heroStatus});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Видалення Героя
export const apiHeroDelete = async (heroId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/${heroId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}


/**
 * ДОПИСИ ГЕРОЯ
 */

// Повертає дописи про Героя
export const apiHeroGetPosts = async (heroId:number): Promise<HeroPostType[]|null> => {
    try {
        const r = await iAxios(`/hero/posts/${heroId}`);
        return r.data || null;
    } catch(e){
        console.error(e);
        return null;
    }
}

// Збереження допису
export const apiHeroSavePost = async (postId:number, post:HeroPostType, reToken?:string|null): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/post/${postId}`, {post, reToken});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
} 

// Зміна статусу
export const apiHeroSetStatusPost = async (postId:number, postStatus:HERO_POST_STAT): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/post/status/${postId}`, {postStatus});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
} 

// Видалення допису
export const apiHeroDeletePost = async (postId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/post/${postId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}


/**
 * БІОГРАФІЯ ГЕРОЯ
 */

export const apiGetHeroBiography = async (heroId:number): Promise<HeroBiographyType|null> => {
    try {
        const r = await iAxios(`/hero/biography/${heroId}`);
        return r.data;
    } catch(e){ 
        console.error(e);
        return null;
    }
} 
 
// Видалення дати з біографії
export const apiHeroDeleteBio = async (biographyId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/biography/${biographyId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Збереження події-дати
export const apiHeroSaveBio = async (biographyId:number, biographyItem:HeroBiographyItem): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/biography/${biographyId}`, {biographyItem});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
} 

 

/**
 * ФОТОГАЛЕРЕЯ ГЕРОЯ
 */

// Повертає фото Героя
export const apiHeroGetPhotos = async (heroId:number): Promise<HeroPhotoItem[]|null> => {
    try {
        const r = await iAxios(`/hero/photos/${heroId}`);
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}

export const apiHeroGetPhotoById = async (photoId:number): Promise<HeroPhotoItem|null> => {
    try {
        const r = await iAxios(`/hero/photo/${photoId}`);
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}


// Зміна сортування
export const apiHeroSortedPhotos = async (heroId:number, sortedIds:number[]): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/photo/sorted/${heroId}`, {sortedIds});
        return r.data.stat;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна статусу
export const apiHeroSetStatusPhoto= async (photoId:number, photoStatus:HERO_PHOTO_STAT): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/photo/status/${photoId}`, {photoStatus});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
} 

// Видалення фото
export const apiHeroDeletePhoto = async (photoId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/photo/${photoId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}
 

// Зміна головного фото профіля фахівця
export const apiHeroSetMainPhoto = async (photoId:number, imgData:string): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/photo/base64/${photoId}`, {imgData});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Відправка відео на YouTube
export const apiHeroSendVideoToYouTube = async (heroId:number, videoUrl:string, description:string, reToken?:string|null): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/video/youtube/${heroId}`, {videoUrl, description, reToken});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}