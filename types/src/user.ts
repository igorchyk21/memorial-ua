import { MLang } from "./bsae.js";

export enum USER_STATUS {
    DISABLE = 0,
    ENABLE = 1
}
 
export enum API_USERS {
    USER_EXISTS = 1,
    USER_BLOCK = 2,
    USER_WRONG_EMAIL = 10
}

export interface UserData  {
    ID:number;
    admin?:boolean;
    userName:string;
    userEmail:string;
    userPicture:string;
    userStat:boolean;
    ban:boolean;
}

export interface UserGeoData {
    geoIp?:string;
    geoIso?:string;
    geoCity?:string;
    geoCountry?:string;
    timeZone?:string;
    defLang?:string;
    refEmail?:string;
}

export interface UserCreateData extends UserGeoData {
    userName: string;
    userEmail: string;
    userStatus: USER_STATUS;
    userPicture?:string;
    googleId?:string,
}

export interface GoogleProfileClaims {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email?: string;
    email_verified?: boolean;
}
