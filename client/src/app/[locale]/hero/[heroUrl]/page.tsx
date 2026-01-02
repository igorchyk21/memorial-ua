import { heroGet, heroGetPosts } from "@/entities/hero";
import { HeroAboutPage } from "@/epages";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { buildHeroPageMetadata } from "@/shared/helper/seo/seoHelpers";
import HeroJsonLd from "@/shared/helper/seo/HeroJsonLd";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from 'next/headers';

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
        path: `/${locale}/hero/${heroUrl}`,
        pageKind: "about",
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
    const resPosts = await heroGetPosts(id);

    return (
        <>
            <HeroJsonLd hero={resHero} locale={locale} path={`/${locale}/hero/${heroUrl}`} />
            <HeroAboutPage 
                hero={resHero}
                posts={resPosts}/>
        </>
    );   
}

export default Page;