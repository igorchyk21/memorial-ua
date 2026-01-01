import { heroGet } from "@/entities/hero";
import { HeroVideoPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const Page = async ({params}:{params:any}) => {
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url);
    if (!resHero) notFound(); 
    return (<HeroVideoPage hero={resHero}/>)    
}

export default Page; 