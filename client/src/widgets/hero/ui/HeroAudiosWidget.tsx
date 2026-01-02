"use client"
import { HeroAudios, HeroAudiosHeader, useHeroAudioActions } from "@/features/hero";
import { HERO_VIDEO_STAT, HeroVideoItem } from "@global/types";

interface Props { 
    heroId:number;
    audios:HeroVideoItem[];
    heroName?:string;
} 

const HeroAudiosWidget = ({heroId, heroName, audios}:Props) => {
    const { handleClickDelete, handleClickStatus, handleClickEdit } = useHeroAudioActions();
    const count = audios.filter(audio =>audio.status === HERO_VIDEO_STAT.ACTIVE)?.length || 0;
    return (<> 
        {Boolean(audios.length) &&
        (<HeroAudiosHeader 
            count={count}/>)}
        <HeroAudios
            heroName={heroName}
            heroId={heroId}
            audios={audios}
            onClickDelete={handleClickDelete}
            onClickStatus={handleClickStatus}
            onClickEdit={handleClickEdit}/>
    </>)
}

export default HeroAudiosWidget;


