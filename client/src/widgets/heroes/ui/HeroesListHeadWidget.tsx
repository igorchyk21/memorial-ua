import { FilterResult, SortHeroes } from "@/features/heroes";
import { useTranslations } from "next-intl";
import { Col, Row } from "react-bootstrap";

interface Props {
    countAllHeroes:number;
}

const HeroesListHeadWidget = ({countAllHeroes}:Props) => {
    const t = useTranslations('hero');
    return (
        <>
        <h1 className="h3 my-4">{t('heroList')}</h1>
        <Row className="mb-1">
            <Col md={9}>
                <FilterResult count={countAllHeroes}/>
            </Col>
            <Col md={3} className="mt-2 mt-md-0">
                <SortHeroes/>
            </Col>
        </Row>
        </>
    )
}

export default HeroesListHeadWidget;