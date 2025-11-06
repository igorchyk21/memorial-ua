"use client"
import { HeroBiographyItem } from "@global/types"
import { Col } from "react-bootstrap";
import { DateTime as DT } from "luxon";
import { useTranslations } from "next-intl";
import HeroBioDropdown from "./HeroBioDropdown";
import { useAuth } from "@/shared/context/Auth";

interface Props {
    item:HeroBiographyItem;
    right?:boolean;
    onClicEdit:(biographyItem:HeroBiographyItem|null)=>void;
    onClickDelete:(iographyItem:HeroBiographyItem)=>void;
}
const HeroBioItem = ({item, onClicEdit, onClickDelete, right=false}:Props) => {

    const t = useTranslations();
    const { auth } = useAuth();
    const title = item.title.startsWith('t_') ? t(`hero.biography.${item.title}`) : item.title;
    const dt = DT.fromMillis(item.dt||0).setLocale('uk').toLocaleString(DT.DATE_FULL)
    const spanDate = (<span className="fw-bold text-primary">{dt}</span>);
    return (<>
            {right && (
                <Col xs={6} className="text-end py-4 pt-3 d-none d-lg-block">
                    <div className="pe-3 d-block">
                        {spanDate}
                    </div>
                </Col>)}

            <Col lg={6} className="py-3 show-date-icon ">
                <div className="date d-lg-none d-flex justify-content-end pe-5">
                    {spanDate}
                </div>
                
                <article className={`border rounded-4 py-4 px-4 mb-4  ${right ? 'right' : ''}`}>
                    <div className="d-flex justify-content-between">
                    <h5 className="mb-0 pe-3"> {title}</h5>
                    {auth?.user.admin &&
                    (<HeroBioDropdown  
                        delDisabled={!Boolean(item.ID)}
                        onClickEdit={()=>onClicEdit(item)}
                        onClickDelete={()=>onClickDelete(item)}/>)}
                    </div>
                    {item.body &&
                    (<p className="mt-3">{item.body}</p>)}
                </article>
            </Col>

            {!right && (
                <Col xs={6} className="py-4 pt-3 d-none d-lg-block">
                    <div className="ps-3 d-block">
                        {spanDate}
                    </div>
                </Col>)}
    </>)
}

export default HeroBioItem;