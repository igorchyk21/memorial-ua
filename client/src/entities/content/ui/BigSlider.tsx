'use client'
import Image from 'next/image'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ContentBaseType } from '@global/types'


interface Props {
    slides:ContentBaseType[],
    href?:string;
    buttonTitle?:string;
}

const BigSlider = ({slides, href, buttonTitle}:Props) => {
  return (
    <section className="position-relative">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        loop={true}
        speed={1500}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="position-absolute top-0 start-0 w-100 h-100"
        data-bs-theme="dark">
        {slides.map(({ image, title, description, background }, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: background }}>
            <div className="position-absolute d-flex align-items-center w-100 h-100 z-2">
              <Container className="mt-lg-n4">
                <Row>
                  <Col xs={12} sm={10} md={7} lg={6}>
                    <h2 className="display-4 pb-2 pb-md-3 pb-lg-4">{title}</h2>
                    <p className="fs-22 text-white mb-lg-4">{description}</p>
                    {href &&
                        (<Link href={href} className="btn btn-lg btn-outline-light rounded-pill">
                        {buttonTitle}
                        </Link>)}
                  </Col>
                </Row>
              </Container>
            </div>
            {image &&

            (<div className='bigslider-img-container'>
            <Image unoptimized priority fill src={image||''} className="object-fit-cover rtl-flip" sizes="3840px" alt="Image" />
            </div>)}
          </SwiperSlide>
        ))}
        <div className="swiper-pagination pb-sm-2"></div>
      </Swiper>
      
      <div className="d-md-none" style={{ height: 380 }} />
      <div className="d-none d-md-block d-lg-none" style={{ height: 420 }} />
      <div className="d-none d-lg-block d-xl-none" style={{ height: 500 }} />
      <div className="d-none d-xl-block d-xxl-none" style={{ height: 560 }} />
      <div className="d-none d-xxl-block" style={{ height: 624 }} />
       
    </section>
  )
}

export default BigSlider
