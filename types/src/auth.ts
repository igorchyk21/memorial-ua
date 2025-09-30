import { UserData } from "./user.js";

export interface AuthData {
    email?:string;
    password?:string;
    token?:string;
}

export interface AuthRecoveryData {
    otp?:string;
    email?:string;
    password?:string;
}

export interface AuthRegisterData {
    userName:string;
    userEmail: string;
}

// Тип для запиту з Google accessToken
export interface GoogleAuthRequestBody {
    accessToken: string;
}


export interface AuthResultType {
    isLogin:boolean;
    user:UserData;
    token:string;
}