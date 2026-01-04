import { heroList } from "@/entities/hero";
import { HeroesPage } from "@/epages";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import { AppPageSearchProps } from "@/types";
import { HeroListRequestParams, HeroListSortType } from "@global/types";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

interface Props extends AppPageSearchProps{
    params: Promise<{ 
        locale:string, 
    }>;
}  

export const generateMetadata = async ({ params }: { params: Props["params"] }): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}/heroes`,
        pageKey: "heroes", 
        t,
    });
};

const Page = async ({params, searchParams}:Props) => {
    const authToken = (await cookies()).get('authToken')?.value;
    
    const {locale} = await params;
    setRequestLocale(locale);
    const sp = await searchParams;
    const heroParams:HeroListRequestParams = {
        onlyCandle: Boolean(sp.onlyCandle),
        page: safeIntParse(sp.page)||1,
        search: sp.search ? sp.search as string : undefined,
        sort: typeof sp.sort === 'string' ? sp.sort as HeroListSortType : undefined,
        region: typeof sp.region === 'string' ? sp.region : undefined
    }
 
    const resHero = await heroList(heroParams,authToken); 

    return (<>
        {resHero?.heroes && 
            (<HeroesPage 
                heroes={resHero.heroes}
                paginator={resHero.paginator}/> )}
        </>)   
}

export default Page;