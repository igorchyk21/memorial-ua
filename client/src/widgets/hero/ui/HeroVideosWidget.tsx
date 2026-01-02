"use client"
import { HeroVideos, HeroVideosHeader, useHeroVideActions } from "@/features/hero";
import { HERO_VIDEO_STAT, HeroVideoItem } from "@global/types";

interface Props { 
    heroId:number;
    videos:HeroVideoItem[];
    heroName?:string;
} 

const HeroVideosWidget = ({heroId, heroName, videos}:Props) => {
    const { handleClickDelete, handleClickStatus, handleClickEdit } = useHeroVideActions();
    const count = videos.filter(video =>video.status === HERO_VIDEO_STAT.ACTIVE)?.length || 0;
    return (<> 
        {Boolean(videos.length) &&
        (<HeroVideosHeader 
            count={count}/>)}
        <HeroVideos
            heroName={heroName}
            heroId={heroId}
            videos={videos}
            onClickDelete={handleClickDelete}
            onClickStatus={handleClickStatus}
            onClickEdit={handleClickEdit}/>
    </>)
}

export default HeroVideosWidget;