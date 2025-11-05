"use client"
import { HERO_STAT, HeroShortType } from "@global/types";
import { useTranslations } from "next-intl";
import { DateTime as DT } from "luxon";
import { HeroAboutDropdown, HeroStatus } from "@/entities/hero";
import { useAuth } from "@/shared/context/Auth";

interface Props {
    hero:HeroShortType;
    onClickEdit:()=>void;
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_STAT)=>void;
}

const HeroAbout = ({hero, onClickEdit, onClickDelete, onClickStatus}:Props) => { 

    const t = useTranslations();
    const { auth } = useAuth();

    return (<> 
        <div className="d-flex justify-content-between">
            <h2>{t('hero.about.title')}</h2>             
            <div>
                {auth?.user.admin &&
                (<HeroAboutDropdown
                    heroStatus={hero.status}
                    onClickDelete={onClickDelete}
                    onClickEdit={onClickEdit}
                    onClickStatus={onClickStatus}/>)}
            </div> 
            
        </div>
        {hero.status !== HERO_STAT.ACTIVE &&
            (<div style={{marginTop:-10}} className="mb-2">
                <HeroStatus status={hero.status}/>
            </div>)}
        <ul className="list-unstyled d-flex flex-column gap-3 fs-sm pb-5 m-0 mb-2 mb-sm-3">

            <li className="d-flex align-items-lg-center position-relative pe-4 flex-column flex-lg-row">
                <span className="fs-6">{t('hero.about.dtBirth')}</span>
                <span className="d-block flex-grow-1 border-bottom border-dashed px-lg-1 mt-lg-2 mx-lg-2" />
                <span className="fs-6 text-dark-emphasis fw-bold text-end">
                    {DT.fromMillis(hero.birth||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}
                </span>
            </li>

            <li className="d-flex align-items-lg-center position-relative pe-4 flex-column flex-lg-row">
                <span className="fs-6">{t('hero.about.dtMobilization')}</span>
                <span className="d-block flex-grow-1 border-bottom border-dashed px-lg-1 mt-lg-2 mx-lg-2" />
                <span className="fs-6 text-dark-emphasis fw-bold text-end">
                    {DT.fromMillis(hero.mobilization||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}
                </span>
            </li>

            <li className="d-flex align-items-lg-center position-relative pe-4 flex-column flex-lg-row">
                <span className="fs-6">{t('hero.about.dtDeath')}</span>
                <span className="d-block flex-grow-1 border-bottom border-dashed px-lg-1 mt-lg-2 mx-lg-2" />
                <span className="fs-6 text-dark-emphasis fw-bold text-end">
                    {DT.fromMillis(hero.death||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}
                </span>
            </li>

            
            {hero.armyName &&
            (<li className="d-flex align-items-lg-center position-relative pe-4 flex-column flex-lg-row">
                <span className="fs-6">{t('hero.about.armyName')}</span>
                <span className="d-block flex-grow-1 border-bottom border-dashed px-lg-1 mt-lg-2 mx-lg-2" />
                <span className="fs-6 text-dark-emphasis fw-bold text-end">{hero.armyName}</span>
            </li>)}

        </ul> 

        {hero.about &&
        (<div dangerouslySetInnerHTML={{__html:hero.about}}></div>)}
    </>)
}

export default HeroAbout;