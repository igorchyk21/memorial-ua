"use client";
import { HeroPhotoDropdown } from "@/entities/hero";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { Col, Row } from "react-bootstrap";
import HeroPhoto from "./HeroPhoto";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { isSameOrderByID } from "../../helper/isSameOrderByID";
import useHeroPhotos from "../model/useHeroPhotos";
import { useAuth } from "@/shared/context/Auth";

interface Props {
    heroId:number;
    heroName?:string;
    photos:HeroPhotoItem[];
    onSort?: (newOrder: HeroPhotoItem[]) => void;

    onClickStatus:(photoId:number, newStatus:HERO_PHOTO_STAT)=>void;
    onClickDelete:(photoId:number)=>void;
    onClickSetMain:(photoId:number)=>void;
}

const HeroPhotos = ({ heroId, heroName, photos, onSort, onClickStatus, onClickDelete, onClickSetMain}:Props) => {
    const t = useTranslations();
    const { smallPhotos } = useGlobal();
    const { auth } = useAuth();
    const { list, setList, changeSort} = useHeroPhotos(heroId, photos);
    const [ showSpinner, setShowSpinner ] = useState<number[]>([]);
    if (smallPhotos === null) return null;

    return (
        
        <ReactSortable
            className="row g-3"
            list={list}
            setList={(newList) => {
                const changed = !isSameOrderByID(newList, list)
                if (changed) {
                    changeSort(newList.map(photo=>photo.ID))
                    setList(newList);
                    console.log(changed)
                }
                onSort?.(newList);
            }}
            animation={150}
            handle=".sortable-handle">
            
                {list
                    .filter(photo=>{
                        return !((photo.status !== HERO_PHOTO_STAT.ACTIVE) && 
                                (!auth?.user.admin) &&
                                ((!auth) || ( auth && (auth.user.ID !== photo.userId))));
                    })
                    .map((photo) => {
                    return (<Col 
                        key={photo.ID}
                        data-id={photo.ID}
                        xs={smallPhotos ? 6 : 12}
                        sm={smallPhotos ? 4 : 6}
                        md={smallPhotos ? 3 : 6}
                        xxl={smallPhotos ? 2 : 6}
                        className="position-relative">


                        {Boolean(auth?.user.admin) &&
                        (<div className="sortable-handle position-absolute text-dark  p-2 btn-icon"
                            style={{left:5, bottom:-5, zIndex:99, textShadow:'1px 1px 1px white', cursor:'grab'}}>
                            <i className="ci-move"/>
                        </div>)}

                        <HeroPhoto 
                            photo={photo} 
                            heroName={heroName}
                            showSpinner={showSpinner.includes(photo.ID)} />

                        <div 
                            className="position-absolute pe-4 w-100 text-end"
                            style={{ bottom: 5 }}> 
                            <HeroPhotoDropdown  
                                showDelete={Boolean(auth?.user.admin) || auth?.user.ID === photo.userId}
                                showActions={Boolean(auth?.user.admin)}
                                disabled={showSpinner.includes(photo.ID)}
                                onClickDelete={async () => {onClickDelete(photo.ID)}}
                                onClickStatus={async (newstatus) => {
                                    setShowSpinner(prev=>[...prev,photo.ID]);
                                    await onClickStatus(photo.ID, newstatus)
                                    setShowSpinner(prev=>prev.filter(id=>id!==photo.ID));
                                }}
                                onClickSetMain={async ()=>onClickSetMain(photo.ID)}
                                photoStatus={photo.status}/>
                        </div>
                    </Col>)
                })}
                
            
        </ReactSortable>
        
    );
};

export default HeroPhotos;
