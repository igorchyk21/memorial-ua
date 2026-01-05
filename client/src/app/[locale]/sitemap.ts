import { heroList } from "@/entities/hero";
import conf from "@/shared/config/conf";
import { HeroListRequestParams } from "@global/types";
import type { MetadataRoute } from "next";
import { setRequestLocale } from "next-intl/server";




const sitemap = async (): Promise<MetadataRoute.Sitemap> => {

    setRequestLocale('ua');

    const heroParams:HeroListRequestParams = {
        page: 1,
        onPage: 9999999
    }
 
    const resHero = await heroList(heroParams); 
    if (!resHero) return [];
    
    const domain = conf.domain;

    const heroUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}`}))||[];

    const candlesUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}/candles`}))||[];

    const photosUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}/photo`}))||[];

    const biographyUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}/biography`}))||[];

    const videosUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}/video`}))||[];

    const audiosUrls = resHero?.heroes.map((hero) => ({
        url: `${domain}/hero/${hero.url}-${hero.ID}/audio`}))||[];
    

    return [
        ...heroUrls,
        ...photosUrls,
        ...biographyUrls,
        ...candlesUrls,
        ...videosUrls,
        ...audiosUrls,
    ];
}


export default sitemap;