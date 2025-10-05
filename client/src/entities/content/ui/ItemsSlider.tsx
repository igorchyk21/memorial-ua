"use client"
import { ContentBaseType } from "@global/types";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
    items:ContentBaseType[];
    title:string;
    id?:string;
}


const ItemsSlider = ({items,title,id }:Props) => {
    return (
        <Container as="section" bsPrefix="container-start mb-5" id={id}>
            <Row className="align-items-center g-0 pt-2 pt-sm-3 pt-md-4 pt-lg-5">
            <Col md={4} lg={3} className="pb-1 pb-md-0 pe-3 ps-md-0 mb-4 mb-md-0">
                <div className="d-flex flex-md-column align-items-end align-items-md-start">
                <div className="mb-md-5 me-3 me-md-0">
                    <h3 className="h1 mb-0">{title}</h3>
                </div>
                <Stack direction="horizontal" gap={2}>
                    <Button
                        variant="outline-secondary"
                        className="btn-icon animate-slide-start rounded-circle me-1"
                        id="prev-values"
                        aria-label="Prev">
                        <i className="ci-chevron-left fs-lg animate-target" />
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="btn-icon animate-slide-end rounded-circle"
                        id="next-values"
                        aria-label="Next">
                        <i className="ci-chevron-right fs-lg animate-target" />
                    </Button>
                </Stack>
                </div>
            </Col>
            <Col md={8} lg={9}>
                <div className="ps-md-4 ps-lg-5">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView="auto"
                    spaceBetween={24}
                    loop={true}
                    navigation={{
                    prevEl: '#prev-values',
                    nextEl: '#next-values',
                    }}>
                    {items.map(({ icon, title, description }, index) => (
                    <SwiperSlide key={index} className="w-auto h-auto">
                        <Card className="h-100 rounded-4 px-3" style={{ maxWidth: 306 }}>
                        <Card.Body className="py-5 px-3">
                            <h5 className="h4 h5 d-flex align-items-center">
                            {title}
                            </h5>
                            <div className="fs-16">
                                <div dangerouslySetInnerHTML={{__html:description||''}}></div>
                            </div>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    ))}
                </Swiper>
                </div>
            </Col>
            </Row>
        </Container>)
}

export default ItemsSlider;