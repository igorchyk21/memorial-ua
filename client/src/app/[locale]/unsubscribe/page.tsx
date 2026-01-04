import { userUnSubscription } from "@/entities/user";
import { NewHeroPage } from "@/epages";
import { _cnMain } from "@/shared/const";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import AlertEmpty from "@/shared/ui/other/AlertEmpty";
import { ClearUrlParams } from "@/shared/ui/other/ClearUrlParams";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}/unsubscribe`,
        pageKey: "unsubscribe",
        t,
    });
};
 
const Page = async ({params, searchParams}:{params:any, searchParams:any}) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    const sp = await searchParams;
    const email = sp.email;
    if (!email) return notFound();
    const res = await userUnSubscription(email);
    if (!res) notFound();
    return (<>
        <AlertEmpty
        title={t('hero.unsubscribe.title')}
        description={t('hero.unsubscribe.description')}/>
        <ClearUrlParams/>
    </>)
} 

export default Page;