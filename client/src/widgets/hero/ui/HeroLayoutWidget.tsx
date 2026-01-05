import { CandleLight } from "@/features/hero";
import { CommonComponentChildren } from "@/types"
import { HeroShortType } from "@global/types"
import { Col, Row } from "react-bootstrap"

interface Props extends CommonComponentChildren {
    hero:HeroShortType;
}

const HeroLayoutWidget = ({children, hero}:Props) => { 
    return (
        <Row>
            <Col lg={8}>
                {children}
            </Col>
            <Col lg={4} className="pt-4 pt-lg-0" >
                <CandleLight   
                    heroId={hero.ID}                    
                    heroName={hero.lName+' '+hero.fName}/> 
            </Col>
        </Row>
    )
}

export default HeroLayoutWidget;