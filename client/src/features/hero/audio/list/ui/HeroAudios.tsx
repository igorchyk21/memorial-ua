"use client";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useAuth } from "@/shared/context/Auth";
import { HERO_VIDEO_STAT, HeroVideoItem } from "@global/types";
import { ReactSortable } from "react-sortablejs";
import { Badge, Col } from "react-bootstrap";
import useHeroAudios from "../model/useHeroAudios";
import { HeroAudio, HeroAudioToolbar } from "@/entities/hero";
import { useTranslations } from "next-intl";
import UserAvatarFull from "@/shared/ui/avatar/UserAvatarFull";
import { DateTime as DT } from "luxon";
import { useEffect, useState } from "react";
import AlertEmpty from "@/shared/ui/other/AlertEmpty";
 
interface Props {
    heroId: number;
    audios: HeroVideoItem[];
    heroName?: string;
    onClickDelete:(audioId:number)=>void;
    onClickStatus:(audioId:number, newStatus:HERO_VIDEO_STAT)=>void;
    onClickEdit:(audioId:number, description:string)=>void;
}

function isSameOrderByID<T extends { ID: number }>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((item, i) => item.ID === b[i].ID);
}


const HeroAudios = ({ heroId, heroName, audios, onClickDelete, onClickStatus, onClickEdit }: Props) => {
    const { smallVideos } = useGlobal();
    const t = useTranslations();
    const { auth } = useAuth();
    const { list, setList, changeSort } = useHeroAudios(heroId, audios);
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
            title={t('hero.audio.empty')}
            description={t('hero.audio.emptyDescription')}/>
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
                        newList.map((audio: any) => Number(audio.ID) || 0)
                    );
                    setList(newList as any);
                }
            }}
            animation={150}
            handle=".sortable-handle">
            {list
                .filter((audio: any) => {
                    const isActive =
                        audio.status === HERO_VIDEO_STAT.ACTIVE ||
                        audio.status === undefined;
                    if (isActive) return true;

                    const isAdmin = Boolean(auth?.user.admin);
                    const isOwner =
                        auth && auth.user && auth.user.ID === audio.userId;

                    return isAdmin || isOwner;
                })
                .map((audio: any) => (
                    <Col
                        key={audio.ID}
                        data-id={audio.ID}
                        xs={12} 
                        className="position-relative"
                    >
                        

                        <div className="rounded-4 overflow-hidden bg-dark-subtle d-flex align-items-center justify-content-center p-3">
                            <HeroAudio
                                audioUrl={audio.url} 
                                heroName={heroName}/>
                        </div>

                         
                        <div className="pt-2 mb-3  justify-content-between">
                            <div> 
                            {audio.description}
                            </div> 
                            <div className="pt-3 gap-2 d-md-flex align-items-center justify-content-between">
                                <UserAvatarFull
                                    email={audio.userEmail}
                                    description={DT.fromMillis(audio.dt||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}
                                    picture={audio.userPicture}
                                    name={audio.userName||t('anonymous')}/>
                                <div className="d-flex align-items-center justify-content-end gap-2 pt-2">
                                    {audio.status === HERO_VIDEO_STAT.ACTIVE && (Boolean(auth?.user.admin)) &&
                                    <Badge bg="success">{t('hero.audio.activeAudio')}</Badge>}

                                    {audio.status === HERO_VIDEO_STAT.PENDING && (Boolean(auth?.user.admin)) &&
                                        <Badge bg="warning">{t('hero.status.panding')}</Badge>}

                                    <div className="sortable-handle text-dark text-end   d-flex align-items-start justify-content-end"
                                        style={{textShadow: "1px 1px 1px white", cursor: "grab"}}>
                                            <HeroAudioToolbar
                                                showDelete={Boolean(auth?.user.admin) || auth?.user.ID === audio.userId}
                                                showActions={Boolean(auth?.user.admin)}
                                                audioStatus={audio.status}
                                                disabled={false}
                                                onClickDelete={() => onClickDelete(audio.ID)}
                                                onClickStatus={(newStatus) => onClickStatus(audio.ID, newStatus)}
                                                onClickEdit={() => onClickEdit(audio.ID, audio.description)}/>

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

export default HeroAudios;


