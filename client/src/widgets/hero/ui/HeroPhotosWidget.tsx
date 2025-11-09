"use client"
import { HeroPhotos, HeroPhotosHeader, useHeroPhotoActions } from "@/features/hero";
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
    
    const { handleClickDelete, handleClickSetMain, handleClickStatus } = useHeroPhotoActions();
    const count = photos.filter(photo =>photo.status === HERO_PHOTO_STAT.ACTIVE)?.length || 0;
    return (<>
        {Boolean(photos.length) &&
        (<HeroPhotosHeader 
            count={count}/>)}
        <HeroPhotos
            heroName={heroName}
            heroId={heroId}
            photos={photos}
            onClickDelete={handleClickDelete}
            onClickStatus={handleClickStatus}
            onClickSetMain={handleClickSetMain}/>
    </>)
}

export default HeroPhotosWidget;