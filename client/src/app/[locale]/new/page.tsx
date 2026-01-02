import { NewHeroPage } from "@/epages";
import { _cnMain } from "@/shared/const";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}/new`,
        pageKey: "newHero",
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className={_cnMain}> 
            <NewHeroPage/>
        </main>)   
} 

export default Page;