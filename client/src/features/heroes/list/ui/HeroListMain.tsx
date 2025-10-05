import { HeroCard } from "@/entities/hero/intex";
import CandleBlack from "@/shared/svg/CandleBlack";
import TitleBlock from "@/shared/ui/other/TitleBlock";
import { HeroShortType } from "@global/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Herolist from "./HeroList";

interface Props {
    heroes:HeroShortType[]
    title?:string;
    linkTitle?:string;
    linkHref?:string;
}

const HeroListMain = ({heroes, title, linkTitle, linkHref}:Props) => {
    const t = useTranslations();
    return (
        <Container as="section" className=" mb-5" id="candles">
            <TitleBlock
                title={title}
                linkTitle={linkTitle}
                linkHref={linkHref}/>

            <Herolist 
                
                heroes={heroes}
                showMax={8}/>

            {heroes.length > 8 && 
                (<div className="py-5 text-center">
                    <Link
                        className="btn btn-primary btn-lg rounded-pill"
                        href="/heroes?onlyCandle=1">
                        <CandleBlack/>
                    <span className="ms-2">{t('buttons.allCandle')}</span>
                    </Link>
                </div>)}
            
        </Container>)
}

export default HeroListMain;