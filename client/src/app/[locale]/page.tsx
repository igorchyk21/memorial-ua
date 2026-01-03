import { contentPageMain } from "@/entities/content/model/contentMode";
import { heroList } from "@/entities/hero";
import { HomePage } from "@/epages";
import { _cnMain } from "@/shared/const";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import { HeroListRequestParams } from "@global/types";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
 
export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}`,
        pageKey: "home",
        t,
    });
}; 

const Page = async ({params}:{params:any}) => {
    const {locale} = await params;
    setRequestLocale(locale);
    const heroParams:HeroListRequestParams = {
            onPage:99999,
            onlyCandle:true
    } 

    const heroParamsAll:HeroListRequestParams = {
        onPage:10,
}
     
    const resHero = await heroList(heroParams);
    const resHeroAll = await heroList(heroParamsAll);
    const pageContent = await contentPageMain();
    const heroes = Array.from(
        new Map(
            [...(resHero?.heroes || []), ...(resHeroAll?.heroes || [])]
                .map(h => [h.ID, h])
        ).values()
    );
    return (
        <main className={_cnMain}> 
            <HomePage  
                heroes={heroes}
                pageContent={pageContent}/> 
        </main>)   
}

export default Page;