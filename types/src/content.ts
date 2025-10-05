export interface ContentBaseType { 
    title?:string;
    description?:string;
    image?:string;
    icon?:string;
    sort?:number;
    background:string;
    url?:string;
    [key:string]:any;
}

export interface ContentPageMain {
    slides : ContentBaseType[];
    about:ContentBaseType;
    features:ContentBaseType[];
    format:ContentBaseType[];
    faq:ContentBaseType[];
}

