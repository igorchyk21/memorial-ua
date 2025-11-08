"use client"
import { HERO_PHOTO_STAT, HERO_POST_STAT } from "@global/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap"

interface Props {
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_PHOTO_STAT)=>void;
    photoStatus:HERO_PHOTO_STAT
}
  
const HeroPhotoDropdown = ({onClickDelete,onClickStatus,photoStatus}:Props) => {

    const t = useTranslations();
    const [ spinner, setSpinner ] = useState(false)

    const clickStatus = async (status:HERO_PHOTO_STAT) => {
        setSpinner(true);
        await onClickStatus(status)
        setSpinner(false);
    }
    return (<>
        {[HERO_PHOTO_STAT.PENDING, HERO_PHOTO_STAT.REJECT].includes(photoStatus) &&
        (<Button className="btn-icon ms-1 rounded-circle p-0" 
            variant="success"
            style={{width:24, height:24}}
            onClick={async ()=>clickStatus(HERO_PHOTO_STAT.ACTIVE)}>
                <i className="ci-check-circle"/></Button>)}

        {[HERO_PHOTO_STAT.PENDING, HERO_PHOTO_STAT.ACTIVE].includes(photoStatus) &&
        (<Button className="btn-icon ms-1 rounded-circle" 
            variant="warning"                    
            style={{width:24, height:24}}
            onClick={async ()=>clickStatus(HERO_PHOTO_STAT.REJECT)}>
                <i className="ci-close-circle"/></Button>)}

        <Button className="btn-icon ms-1 rounded-circle" 
            variant="danger"
            style={{width:24, height:24}}
            onClick={onClickDelete}><i className="ci-trash-empty"/></Button>
    </>)
}

export default HeroPhotoDropdown;