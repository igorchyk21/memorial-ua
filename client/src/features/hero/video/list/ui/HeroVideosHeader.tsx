"use client"
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";

interface Props {
    count:number;
}


const HeroVideosHeader = ({count}:Props) => {
    const t = useTranslations();
    const { smallVideos, setSmallVideos } = useGlobal();

    return (
        <div className="pt-1 mb-2 d-flex justify-content-between">
            <h6>{t('hero.video.countVideos')} ({count})</h6> 
            <div>
                <Button
                    className="btn-icon rounded-circle "
                    variant="outline-secondary"
                    onClick={()=>setSmallVideos(prev=>!prev)}
                    size="sm">
                        <i className={`bi bi-grid${!smallVideos ? '-3x3-gap' : ''} p-0`} 
                            style={{height:16, width:16, marginRight:-2}}/>
                </Button>
            </div>
        </div>
    )
}

export default HeroVideosHeader;