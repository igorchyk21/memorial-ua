import { ContentBaseType } from "@global/types";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

interface Props {
    content:ContentBaseType;
    id?:string;
}

const InfoBlock = ({content, id}:Props) => {
    return (
        <Container as="section" className="mb-5 pb-5" id={id}> 
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <div className="position-relative h-100">
                    <div className="ratio ratio-16x9" />
                    <Image
                        src={content.image||''}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-fit-cover rounded-5"
                        alt={content.title||''}/>
                    
                    </div>
                </Col>
                <Col>
                    <div className="bg-body-tertiary rounded-5 py-5 px-4 px-sm-5">
                        <div className="py-md-3 py-lg-4 py-xl-5 px-lg-4 px-xl-5 my-lg-2 my-xl-4 my-xxl-5">
                            <h2 className="h3 pb-sm-1 pb-lg-2">{content.title||''}</h2>
                            <div className="fs-20 pb-sm-2 pb-lg-0 mb-4 mb-lg-5">
                            <div dangerouslySetInnerHTML={{__html:content.description||''}}></div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>)
}

export default InfoBlock;