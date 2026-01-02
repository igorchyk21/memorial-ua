"use client";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useAuth } from "@/shared/context/Auth";
import { HERO_VIDEO_STAT, HeroVideoItem } from "@global/types";
import { ReactSortable } from "react-sortablejs";
import { Badge, Col } from "react-bootstrap";
import useHeroVideos from "../model/useHeroVideos";
import conf from "@/shared/config/conf";
import { parseYouTubeUrl } from "@/shared/helper/videFunctions/parseYouTubeUrl";
import { HeroVideoToolbar } from "@/entities/hero";
import HeroVideo from "./HeroVideo";
import { useTranslations } from "next-intl";
import UserAvatar from "@/shared/ui/avatar/UserAvatar";
import UserAvatarFull from "@/shared/ui/avatar/UserAvatarFull";
import { DateTime as DT } from "luxon";
import { useEffect, useState } from "react";
import AlertEmpty from "@/shared/ui/other/AlertEmpty";
 
interface Props {
    heroId: number;
    videos: HeroVideoItem[];
    heroName?: string;
    onClickDelete:(videoId:number)=>void;
    onClickStatus:(videoId:number, newStatus:HERO_VIDEO_STAT)=>void;
    onClickEdit:(videoId:number, description:string)=>void;
}

function isSameOrderByID<T extends { ID: number }>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((item, i) => item.ID === b[i].ID);
}

const HeroVideos = ({ heroId, heroName, videos, onClickDelete, onClickStatus, onClickEdit }: Props) => {
    const { smallVideos } = useGlobal();
    const t = useTranslations();
    const { auth } = useAuth();
    const { list, setList, changeSort } = useHeroVideos(heroId, videos);
    const [ count, setCount ] = useState<number|null>(null);    
    
    useEffect(()=>{
        const count =list
        .filter(video=>{
            return !((video.status !== HERO_VIDEO_STAT.ACTIVE) && 
                    (!auth?.user.admin) &&
                    ((!auth) || ( auth && (auth.user.ID !== video.userId))))})?.length || 0;
        setCount(count);
        
    },[]);  

    return (<>
        {count === 0 && 
        (<AlertEmpty
            title={t('hero.video.empty')}
            description={t('hero.video.emptyDescription')}/>
        )}
        <ReactSortable
            className="row g-3"
            list={list}
            setList={(newList) => {
                const changed = !isSameOrderByID(
                    newList as any[],
                    list as any[]
                );
                if (changed) {
                    changeSort(
                        newList.map((video: any) => Number(video.ID) || 0)
                    );
                    setList(newList as any);
                }
            }}
            animation={150}
            handle=".sortable-handle">
            {list
                .filter((video: any) => {
                    const isActive =
                        video.status === HERO_VIDEO_STAT.ACTIVE ||
                        video.status === undefined;
                    if (isActive) return true;

                    const isAdmin = Boolean(auth?.user.admin);
                    const isOwner =
                        auth && auth.user && auth.user.ID === video.userId;

                    return isAdmin || isOwner;
                })
                .map((video: any) => (
                    <Col
                        key={video.ID}
                        data-id={video.ID}
                        xs={12}
                        sm={smallVideos ? 6 : 12}
                        md={smallVideos ? 6 : 12}
                        xxl={smallVideos ? 6 : 12}
                        className="position-relative"
                    >
                        

                        <div className="ratio ratio-16x9 rounded-4 overflow-hidden bg-dark-subtle d-flex align-items-center justify-content-center">
                            <HeroVideo 
                                videoUrl={video.url} 
                                showSpinner={false}
                                heroName={heroName}/>
                        </div>
                        <div className="pt-2 mb-3  justify-content-between">
                            <div> 
                            {video.description}
                            </div> 
                            <div className="pt-3 gap-2 d-md-flex align-items-center justify-content-between">
                                <UserAvatarFull
                                    email={video.userEmail}
                                    description={DT.fromMillis(video.dt||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}
                                    picture={video.userPicture}
                                    name={video.userName||t('anonymous')}/>

                                <div className="d-flex align-items-center justify-content-end gap-2 pt-2 pt-md-0">
                                    {video.status === HERO_VIDEO_STAT.ACTIVE && (Boolean(auth?.user.admin)) &&
                                        <Badge bg="success">{t('hero.video.activeVideo')}</Badge>}

                                    {video.status === HERO_VIDEO_STAT.PENDING && (Boolean(auth?.user.admin)) &&
                                        <Badge bg="warning">{t('hero.status.panding')}</Badge>}
                                    <div className="sortable-handle text-dark text-end   d-flex align-items-start justify-content-end"
                                        style={{textShadow: "1px 1px 1px white", cursor: "grab"}}>
                                            <HeroVideoToolbar
                                                showDelete={Boolean(auth?.user.admin) || auth?.user.ID === video.userId}
                                                showActions={Boolean(auth?.user.admin)}
                                                videoStatus={video.status}
                                                disabled={false}
                                                onClickDelete={() => onClickDelete(video.ID)}
                                                onClickStatus={(newStatus) => onClickStatus(video.ID, newStatus)}
                                                onClickEdit={() => onClickEdit(video.ID, video.description)}/>

                                        {Boolean(auth?.user.admin) &&   
                                            (<i className="ci-move ms-2" />)}
                                </div>
                            </div>
                            </div>   
                        </div>
                    </Col>
                ))}
        </ReactSortable>
    </>);
};

export default HeroVideos;