import { heroGet, heroGetAudios } from "@/entities/hero";
import { HeroAudioPage } from "@/epages";
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
        path: `/${locale}/hero/${heroUrl}/audio`,
        pageKind: "audio",
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url);
    if (!resHero) notFound(); 
    const resAudios = await heroGetAudios(resHero.ID)
    if (!resAudios) notFound();
    return (
        <>
            <HeroJsonLd hero={resHero} locale={locale} path={`/${locale}/hero/${heroUrl}`} />
            <HeroAudioPage hero={resHero} audios={resAudios||[]}/>
        </>
    );   
}

export default Page;