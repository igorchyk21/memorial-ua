import { heroGet } from "@/entities/hero";
import { NewHeroResultPage } from "@/epages";
import { _cnMain } from "@/shared/const";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import { safeIntParse } from "@/shared/helper/safeParsers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
 
export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}/new`,
        pageKey: "newHeroResult",
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const authToken = (await cookies()).get('authToken')?.value;
    
    const {locale, heroId} = await params;
    setRequestLocale(locale);
    const id = safeIntParse(heroId);
    if (!id) notFound();
    const resHero = await heroGet(id,'',authToken, true);   
    if (!resHero) notFound(); 
    return (
        <main className={_cnMain}> 
            <NewHeroResultPage hero={resHero}/>
        </main>)   
} 

export default Page;