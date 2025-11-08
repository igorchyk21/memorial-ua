"use client";
import { HeroPhotoDropdown } from "@/entities/hero";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { Col, Row } from "react-bootstrap";
import HeroPhoto from "./HeroPhoto";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { isSameOrderByID } from "../../helper/isSameOrderByID";
import useHeroPhotos from "../model/useHeroPhotos";

interface Props {
    heroId:number;
    heroName?:string;
    photos:HeroPhotoItem[];
    onSort?: (newOrder: HeroPhotoItem[]) => void;
}

const HeroPhotos = ({ heroId, heroName, photos, onSort }:Props) => {
    const t = useTranslations();
    const { smallPhotos } = useGlobal();
    const { list, setList, changeSort} = useHeroPhotos(heroId, photos);
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
            
                {list.map((photo) => (
                    <Col
                        key={photo.ID}
                        data-id={photo.ID}
                        xs={smallPhotos ? 6 : 12}
                        sm={smallPhotos ? 4 : 6}
                        md={smallPhotos ? 3 : 6}
                        xxl={smallPhotos ? 2 : 6}
                        className="position-relative"
                    >
                        {/* handle для перетягування */}
                        <div className="sortable-handle position-absolute text-dark  p-2 btn-icon"
                            style={{left:5, bottom:-5, zIndex:99, textShadow:'1px 1px 1px white', cursor:'grab'}}>
                            <i className="ci-move"/>
                        </div>

                        <HeroPhoto photo={photo} heroName={heroName} />

                        <div
                            className="position-absolute pe-4 w-100 text-end"
                            style={{ bottom: 5 }}
                        >
                            <HeroPhotoDropdown
                                onClickDelete={() => null}
                                onClickStatus={() => null}
                                photoStatus={photo.status}
                            />
                        </div>
                    </Col>
                ))}
            
        </ReactSortable>
        
    );
};

export default HeroPhotos;
