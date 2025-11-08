"use client"
import { HeroPhotos, HeroPhotosHeader } from "@/features/hero";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";

interface Props {
    heroId:number;
    photos:HeroPhotoItem[];
    heroName?:string;
}
 
const HeroPhotosWidget = ({heroId, heroName, photos}:Props) => {
    
    const count = photos.filter(photo =>photo.status === HERO_PHOTO_STAT.ACTIVE)?.length || 0;
    return (<>
        {photos.length &&
        (<HeroPhotosHeader 
            count={count}/>)}
        <HeroPhotos
            heroName={heroName}
            heroId={heroId}
            photos={photos}/>
    </>)
}

export default HeroPhotosWidget;