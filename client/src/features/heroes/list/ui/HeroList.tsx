import { HeroCard } from "@/entities/hero";
import { HeroShortType } from "@global/types";
import { Col, Row } from "react-bootstrap";

interface Props {
    heroes:HeroShortType[];
    className?:string;
    showMax?:number;
}

const Herolist = ({heroes, className, showMax = 99999999999}:Props) => {
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
        </Row>
    )
}

export default Herolist;