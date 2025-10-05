export type MLang = 'ua' | 'en' | 'ru';


export interface PaginatorType {
    countRows:number;
    countPages:number;
    currentPage:number;
    onPage:number;
}