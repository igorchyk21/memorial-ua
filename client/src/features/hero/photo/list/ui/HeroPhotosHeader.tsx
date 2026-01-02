"use client"
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";

interface Props {
    count:number;
}

const HeroPhotosHeader = ({count}:Props) => {

    const t = useTranslations();
     
    const { smallPhotos, setSmallPhotos } = useGlobal();

    return (
        <div className="pt-1 mb-2 d-flex justify-content-between">
            <h6>{t('hero.photo.countPhotos')} ({count})</h6>
            <div>
                <Button
                    className="btn-icon rounded-circle "
                    variant="outline-secondary"
                    onClick={()=>setSmallPhotos(prev=>!prev)}
                    size="sm">
                        <i className={`bi bi-grid${!smallPhotos ? '-3x3-gap' : ''} p-0`} 
                            style={{height:16, width:16, marginRight:-2}}/>
                </Button>
            </div>
        </div>
    )
}

export default HeroPhotosHeader;