import { ContentBaseType } from "@global/types";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";

interface Props {
    items:ContentBaseType[];
    title:string;
    id?:string;
}

const FaqBlock = ({items,title,id}:Props) => {
    return (
        <Container as="section" className="pb-5 mb-5" id={id}>
            <Row className="pt-2 pt-sm-3 pt-md-4 pt-lg-5 d-flex justify-content-center">
                <Col  lg={10} className="pt-md-3 pt-xl-4 pt-xxl-5">
                    <div className="ps-md-3 ps-lg-4 ps-xl-5 ms-xxl-4">
                    <h3 className="h1 pb-1 pb-sm-2 pb-lg-3">{title}</h3>
                    <Accordion defaultActiveKey="0" className="accordion-alt-icon">
                        {items.map((item, index) => (
                        <AccordionItem key={index} eventKey={`${index}`}>
                            <AccordionHeader as="h3" className="animate-underline">
                            <span className="animate-target me-2 fs-22">{item.title||''}</span>
                            </AccordionHeader>
                            <AccordionBody className="fs-18">
                            <div dangerouslySetInnerHTML={{__html:item.description||''}}></div>
                            </AccordionBody>
                        </AccordionItem>
                        ))}
                    </Accordion>
                    </div>
                </Col>
            </Row>
        </Container>)
}

export default FaqBlock;