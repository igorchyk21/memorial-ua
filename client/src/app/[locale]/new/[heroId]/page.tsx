import { contentBigSlider } from "@/entities/content";
import { contentPageMain } from "@/entities/content/model/contentMode";
import { heroGet, heroList } from "@/entities/hero";
import { HomePage, NewHeroPage, NewHeroResultPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { HeroListRequestParams } from "@global/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Card, Container } from "react-bootstrap";
 
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