import { heroGet, heroGetVideos } from "@/entities/hero";
import { HeroVideoPage } from "@/epages";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { buildHeroPageMetadata } from "@/shared/helper/seo/seoHelpers";
import HeroJsonLd from "@/shared/helper/seo/HeroJsonLd";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale, heroUrl } = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const hero = await heroGet(id, url);
    if (!hero) return {};

    const t = await getTranslations();

    return buildHeroPageMetadata({
        hero,
        locale,
        path: `/${locale}/hero/${heroUrl}/video`,
        pageKind: "video",
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url);
    if (!resHero) notFound(); 
    const resVideos = await heroGetVideos(resHero.ID)
 
    return (
        <>
            <HeroJsonLd hero={resHero} locale={locale} path={`/${locale}/hero/${heroUrl}`} />
            <HeroVideoPage 
                hero={resHero}
                videos={resVideos||[]}/>
        </>
    );     
}

export default Page; 