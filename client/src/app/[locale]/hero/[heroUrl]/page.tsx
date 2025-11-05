import { contentBigSlider } from "@/entities/content/model/contentMode";
import { heroGet, heroGetPosts, heroList, HeroSlider } from "@/entities/hero";
import { HeroAboutPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { HERO_POST_STAT } from "@global/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from 'next/headers';

 
const Page = async ({params}:{params:any}) => {
    const authToken = (await cookies()).get('authToken')?.value;
    
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url,authToken); 
    if (!resHero) notFound(); 
    const resPosts = await heroGetPosts(id) 
    return (<HeroAboutPage 
                hero={resHero}
                posts={resPosts}/>)   
}

export default Page;