import { heroList } from "@/entities/hero";
import { HeroesPage, HomePage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { AppPageSearchProps } from "@/types";
import { HeroListRequestParams, HeroListSortType, HeroShortType } from "@global/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

interface Props extends AppPageSearchProps{
    params: Promise<{ 
        locale:string, 
    }>;
}  

const Page = async ({params, searchParams}:Props) => {
    const authToken = (await cookies()).get('authToken')?.value;
    
    const {locale} = await params;
    setRequestLocale(locale);
    const sp = await searchParams;
    const heroParams:HeroListRequestParams = {
        onlyCandle: Boolean(sp.onlyCandle),
        page: safeIntParse(sp.page)||1,
        search: sp.search ? sp.search as string : undefined,
        sort: typeof sp.sort === 'string' ? sp.sort as HeroListSortType : undefined
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