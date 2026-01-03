import iAxios from "@/shared/api/iAxios";
import { HERO_PHOTO_STAT, HERO_POST_STAT, HERO_STAT, HERO_VIDEO_STAT, HeroBiographyItem, HeroBiographyType, HeroCandleDataType, HeroListRequestParams, HeroListResponse, HeroPhotoItem, HeroPostType, HeroShortType, HeroVideoItem } from "@global/types";
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


/**
 * ВІДЕО ГЕРОЯ
 */

// Повертає відео Героя
export const apiHeroGetVideos = async (heroId:number): Promise<HeroVideoItem[]|null> => {
    try {
        const r = await iAxios(`/hero/videos/${heroId}`);
        return r.data;
    } catch(e){
        console.error(e);
        return null;
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

// Зміна сортування
export const apiHeroSortedVideos = async (heroId:number, sortedIds:number[]): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/video/sorted/${heroId}`, {sortedIds});
        return r.data.stat;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Видалення відео
export const apiHeroDeleteVideo = async (videoId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/video/${videoId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна статусу
export const apiHeroSetStatusVideo = async (videoId:number, videoStatus:HERO_VIDEO_STAT): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/video/status/${videoId}`, {videoStatus});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}   

// Зміна опису відео
export const apiHeroEditVideo = async (videoId:number, description:string): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/video/description/${videoId}`, {description});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}


/**
 * АУДІО ГЕРОЯ
 * (аналогічно до відео, але без прив'язки до YouTube;
 *  використовується довільне посилання на аудіо)
 */

// Повертає аудіо Героя
export const apiHeroGetAudios = async (heroId:number): Promise<HeroVideoItem[]|null> => {
    try {
        const r = await iAxios(`/hero/audios/${heroId}`);
        return r.data;
    } catch(e){
        console.error(e);
        return null;
    }
}

// Додавання аудіо за довільним посиланням
export const apiHeroSendAudioByLink = async (heroId:number, audioUrl:string, description:string, reToken?:string|null): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/audio/link/${heroId}`, {audioUrl, description, reToken});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна сортування аудіо
export const apiHeroSortedAudios = async (heroId:number, sortedIds:number[]): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/audio/sorted/${heroId}`, {sortedIds});
        return r.data.stat;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Видалення аудіо
export const apiHeroDeleteAudio = async (audioId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/audio/${audioId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна статусу аудіо
export const apiHeroSetStatusAudio = async (audioId:number, audioStatus:HERO_VIDEO_STAT): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/audio/status/${audioId}`, {audioStatus});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Зміна опису аудіо
export const apiHeroEditAudio = async (audioId:number, description:string): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/audio/description/${audioId}`, {description});
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

export const apiHeroAddCandle = async (heroId:number, candle:HeroCandleDataType, reToken?:string|null): Promise<number|null> => {
    try {
        const r = await iAxios.post(`/hero/candle/${heroId}`, {candle, reToken});
        return r.data.expiries || null;
    } catch(e){
        console.error(e);
        return null;
    }
}

// Додаємо підпискуу на Героя
export const apiHeroAddSubscription = async (heroId:number): Promise<boolean> => {
    try {
        const r = await iAxios.post(`/hero/subscription/${heroId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}

// Видаляємо підписку на Героя
export const apiHeroDeleteSubscription = async (heroId:number): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/hero/subscription/${heroId}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}