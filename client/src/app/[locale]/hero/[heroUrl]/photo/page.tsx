import { heroGet, heroGetPhotos } from "@/entities/hero";
import { HeroPhotoPage } from "@/epages";
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
    const resPhoto = await heroGetPhotos(resHero.ID)
    console.log(resPhoto)
    return (<HeroPhotoPage 
                photos={resPhoto||[]}
                hero={resHero}/>)   
}

export default Page;