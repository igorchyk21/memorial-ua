import { heroGet, heroGetBiography } from "@/entities/hero";
import { HeroBiograohyPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const Page = async ({params}:{params:any}) => {
    const authToken = (await cookies()).get('authToken')?.value;
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url,authToken);
    if (!resHero) notFound(); 
    const resBio = await heroGetBiography(id, resHero);
    return (<HeroBiograohyPage  
                biography={resBio}
                hero={resHero}/>)   
}

export default Page;