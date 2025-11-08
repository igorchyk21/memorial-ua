"use client"
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { HERO_POST_STAT, HERO_STAT } from "@global/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap"

interface Props {
    heroStatus:HERO_STAT;
    onClickEdit:()=>void;
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_STAT)=>void;
} 

const HeroAboutDropdown = ({onClickEdit,onClickDelete,onClickStatus, heroStatus}:Props) => {
    const t = useTranslations();
    const [ spinner, setSpinner ] = useState(false)

    const clickStatus = async (status:HERO_STAT) => {
        setSpinner(true);
        await onClickStatus(status)
        setSpinner(false);
    }
    return ( 
        <Dropdown>
            <Dropdown.Toggle as={Button}
                disabled={spinner}
                className={`btn-icon border-0 animate-slide-end  rounded-pill`}
                variant="secondary"
                size="sm">
                    {spinner
                    ?(<Spinner style={{height:16, width:16}}/>)
                    :(<i className="ci-tool animate-target fs-sm" style={{width:14}} />)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onClickEdit}><i className="ci-edit me-2"/>{t('hero.about.edit')}</Dropdown.Item>
                <Dropdown.Item onClick={onClickDelete}><i className="ci-trash-empty me-2"/>{t('hero.about.delete')}</Dropdown.Item>
                <Dropdown.Divider/>
                {[HERO_STAT.PENDING, HERO_STAT.REJECT].includes(heroStatus) &&
                (<Dropdown.Item onClick={async ()=>clickStatus(HERO_STAT.ACTIVE)}><i className="ci-check-circle me-2"/>{t('hero.about.accept')}</Dropdown.Item>)}

                {[HERO_STAT.PENDING, HERO_STAT.ACTIVE].includes(heroStatus) &&
                (<Dropdown.Item onClick={async ()=>clickStatus(HERO_STAT.REJECT)}><i className="ci-close-circle me-2"/>{t('hero.about.reject')}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default HeroAboutDropdown;