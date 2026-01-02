"use client"
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";

interface Props {
    count:number;
}


const HeroAudiosHeader = ({count}:Props) => {
    const t = useTranslations();
     

    return (
        <div className="pt-1 mb-2 d-flex justify-content-between">
            <h6>{t('hero.audio.countAudios')} ({count})</h6> 
             
        </div>
    )
}

export default HeroAudiosHeader;


