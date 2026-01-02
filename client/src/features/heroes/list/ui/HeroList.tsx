import { HeroCard } from "@/entities/hero";
import { HeroShortType } from "@global/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, Col, Row } from "react-bootstrap";
 
interface Props {
    heroes:HeroShortType[];
    className?:string;
    showMax?:number;
}

const Herolist = ({heroes, className, showMax = 99999999999}:Props) => {
    const t = useTranslations();
    return (
        <Row className={className}>
            {heroes
                .filter((_,i) => i<showMax )
                .map(hero=>{
                return (
                    <Col key={hero.ID} 
                        lg={3} md={6} xs={12}>
                        <HeroCard hero={hero}/>  
                    </Col>
                )
            })}

            {heroes.length === 0 && 
            (<div className="p-5 text-center">
                <h2 className="text-center mb-5">{t('noHero')}</h2>
                <Link
                    className="btn btn-primary btn-lg rounded-pill"
                    href="/heroes">
                    {t('buttons.allHeroes')}
                </Link>
            </div>)}
        </Row>
    )
}

export default Herolist;