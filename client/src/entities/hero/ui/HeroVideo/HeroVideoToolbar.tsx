"use client"
import { HERO_PHOTO_STAT, HERO_POST_STAT, HERO_VIDEO_STAT } from "@global/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap"

interface Props {
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_VIDEO_STAT)=>void;
    onClickEdit:()=>void;
    videoStatus:HERO_VIDEO_STAT;
    disabled?:boolean;
    showDelete?:boolean;
    showActions?:boolean;
}
  
const HeroVideoToolbar = ({onClickDelete,onClickStatus,onClickEdit,videoStatus,disabled,showDelete,showActions}:Props) => {

    const t = useTranslations();
    const [ spinner, setSpinner ] = useState(false)

    const clickStatus = async (status:HERO_VIDEO_STAT) => {
        setSpinner(true);
        await onClickStatus(status)
        setSpinner(false);
    }
    return (<> 
 
        <div className="d-flex justify-content-end">
        {showActions &&
        (<Button className="btn-icon ms-1 rounded-circle p-0" 
            variant="primary"
            disabled={disabled}
            style={{width:24, height:24}}
            onClick={async ()=>onClickEdit()}>
                <i className="ci-video"/></Button>)}


        {[HERO_VIDEO_STAT.PENDING, HERO_VIDEO_STAT.REJECT].includes(videoStatus) && showActions &&
        (<Button className="btn-icon ms-1 rounded-circle p-0" 
            variant="success"
            disabled={disabled}
            style={{width:24, height:24}}
            onClick={async ()=>clickStatus(HERO_VIDEO_STAT.ACTIVE)}>
                <i className="ci-check-circle"/></Button>)}

        {[HERO_VIDEO_STAT.PENDING, HERO_VIDEO_STAT.ACTIVE].includes(videoStatus) && showActions &&
        (<Button className="btn-icon ms-1 rounded-circle" 
            variant="warning"  
            disabled={disabled}                  
            style={{width:24, height:24}}
            onClick={async ()=>clickStatus(HERO_VIDEO_STAT.REJECT)}>
                <i className="ci-close-circle"/></Button>)}

        {showDelete &&
        (<Button className="btn-icon ms-1 rounded-circle" 
            variant="danger"
            disabled={disabled}
            style={{width:24, height:24}}
            onClick={async () => onClickDelete()}><i className="ci-trash-empty"/></Button>)}
        </div>
    </>)
}

export default HeroVideoToolbar;