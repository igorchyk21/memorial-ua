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
import { ContentBaseType, HeroShortType } from '@global/types'
import HeroCard from '../HeroCard/HeroCard'


interface Props {
    hero:HeroShortType;
    onClickSubscription:(heroId:number)=>void;
}

const HeroSlider = ({hero, onClickSubscription}:Props) => {


    if (!hero) return null;
    return (
        <section className="position-relative" style={{height:500}}>
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
            data-bs-theme="dark"
            style={{zIndex:0}}>
            {hero.slides?.map((image, index) => (
            <SwiperSlide key={index} style={{ backgroundColor: image }}>
                <div className="position-absolute d-flex align-items-center w-100 h-100 z-2">
                <Container className="mt-lg-n4">
                    <Row>
                    <Col md={6} className='d-flex align-items-center justify-content-center'>
                        <h1 className="hero-slider-name display-3 mt-4 pb-md-3 pb-lg-4  text-truncate">{hero.fName} <br/>{hero.lName}</h1>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div className='m-auto d-flex align-items-center'>
                        <HeroCard 
                            hero={hero} 
                            showName={false} 
                            onClickSubscription={onClickSubscription}/> 
                        </div>
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
            
        </Swiper>
         
        </section>
    )
}

export default HeroSlider;
