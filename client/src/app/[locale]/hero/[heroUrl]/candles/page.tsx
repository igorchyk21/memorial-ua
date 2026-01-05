import { heroGet, heroGetCandles, heroGetPhotos } from "@/entities/hero";
import { HeroCandlesPage, HeroPhotoPage } from "@/epages";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { buildHeroPageMetadata } from "@/shared/helper/seo/seoHelpers";
import HeroJsonLd from "@/shared/helper/seo/HeroJsonLd";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const authToken = (await cookies()).get('authToken')?.value;
    const { locale, heroUrl } = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const hero = await heroGet(id, url, authToken);
    if (!hero) return {};

    const t = await getTranslations();

    return buildHeroPageMetadata({
        hero,
        locale,
        path: `/${locale}/hero/${heroUrl}/candles`,
        pageKind: "candles",
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const authToken = (await cookies()).get('authToken')?.value;
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url,authToken); 
    if (!resHero) notFound(); 
    const candles = await heroGetCandles(resHero.ID); 
    return (
        <>
            <HeroJsonLd hero={resHero} locale={locale} path={`/${locale}/hero/${heroUrl}`} />
            <HeroCandlesPage hero={resHero} candles={candles}/>
        </>
    );   
}

export default Page; 