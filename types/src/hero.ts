import { PaginatorType } from "./bsae.js";

export enum HERO_POST_STAT {
    PENDING = 0,
    ACTIVE = 1,
    REJECT = -1
}

export enum HERO_STAT {
    PENDING = 0,
    ACTIVE = 1,
    REJECT = -1
}


export enum HERO_PHOTO_STAT {
    PENDING = 0,
    ACTIVE = 1,
    REJECT = -1
}

export type HeroListSortType = 
    | 'name'
    | 'nameDesc'
    | 'birth'
    | 'birthDesc'
    | 'death'
    | 'deathDesc'
    | '';

export interface HeroListRequestParams {
    search?:string|null;
    page?:number;
    onPage?:number;
    status?:HERO_STAT[]
    onlyCandle?:boolean;
    sort?: HeroListSortType;
}

export interface HeroDateType {
    date:number;
    title:string;
    description:string;
}

export interface HeroShortType {
    ID:number;
    fName:string;
    lName:string;
    mName:string;
    birth:number;
    death:number;
    photo?:string;
    mobilization:number;
    armyName:string|null;
    callSign?:string;
    url:string;
    status:HERO_STAT
    candleExpiries?:number;
    slides?:string[];
    about?:string|null;
}

export interface HeroType extends HeroShortType { 
    dates:HeroDateType[]
}

export interface HeroListResponse {
    heroes:HeroShortType[];
    paginator:PaginatorType;
}

export type HeroBiographyType = HeroBiographyItem[];
export interface HeroBiographyItem {
    ID:number;
    heroId:number;
    dt:number;
    title:string;
    body?:string|null;
}

export type HeroPhotosType = HeroPhotoItem[];
export interface HeroPhotoItem {
    ID:number;
    heroId:number;
    userId:number;
    uploadDt:number;
    url:string;
    description:string;
    status:HERO_PHOTO_STAT;
    userName?:string|null;
    userPicture?:string|null;
}

export interface HeroPostType {
    ID:number;
    heroId:number;
    userId:number;
    dt:number;
    body:string;
    userName?:string;
    author?:string|null;
    userPicture?:string;
    status:HERO_POST_STAT;
}