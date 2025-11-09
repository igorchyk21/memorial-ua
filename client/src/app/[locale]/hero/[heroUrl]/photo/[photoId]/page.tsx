import { heroDeletePhoto, heroGet, heroGetPhotoById } from "@/entities/hero";
import { HeroPhotoPage, HeroPhotoSetMainPage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { stringUrlIdCortage } from "@/shared/helper/string/stringUrlIdCortage";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const Page = async ({params}:{params:any}) => {
    const {locale, heroUrl, photoId} = await params;
    if (!safeIntParse(photoId)) return notFound();
    setRequestLocale(locale);
    const [id, url] = stringUrlIdCortage(heroUrl);
    const resHero = await heroGet(id,url);
    if (!resHero) notFound(); 
    const resPhoto = await heroGetPhotoById(safeIntParse(photoId)); 
    if (!resPhoto) notFound(); 

    return (<HeroPhotoSetMainPage
                heroId={resHero.ID}
                heroName={`${resHero.fName} ${resHero.lName}`}
                photo={resPhoto}/>)   
}

export default Page;