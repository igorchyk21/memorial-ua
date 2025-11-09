import { contentBigSlider } from "@/entities/content";
import { contentPageMain } from "@/entities/content/model/contentMode";
import { heroList } from "@/entities/hero";
import { HomePage, NewHeroPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { HeroListRequestParams } from "@global/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
 
const Page = async ({params}:{params:any}) => {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations();
    const pageContent = await contentPageMain();

    return (
        <main className={_cnMain}> 
            <NewHeroPage/>
        </main>)   
} 

export default Page;