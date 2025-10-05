import { PaginatorType } from "./bsae.js";

export enum HERO_STAT {
    ENABLE = 1,
    DISABLE = 0,
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
    photo:string;
    mobilization:number;
    callSign:string;
    url:string;
    status:HERO_STAT
    candleExpiries:number;
}

export interface HeroType extends HeroShortType { 
    dates:HeroDateType[]
}

export interface HeroListResponse {
    heroes:HeroShortType[];
    paginator:PaginatorType;
}