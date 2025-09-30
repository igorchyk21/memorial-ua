import { ReactNode } from "react";

export type AppPageProps = Readonly<{
    params: Promise<{ [key: string]: string | string[] | undefined }>;
}>;


export type AppPageParamProps = Readonly<{
    params: Promise<{ locale: string, [key: string]: string  }>;
}>;

export type AppPageSearchProps = Readonly<{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;


export type AppLayoutProp = Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>;
 
 