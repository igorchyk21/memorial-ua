"use client"

import { Offcanvas } from "react-bootstrap";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import { useEffect, useState } from "react";
import { HeroCandleList } from "@/features/hero";

const HeroCandlesListWidget = () => {
    const { heroCandlesListShow, setHeroCandlesListShow } = useGlobal();
    const [ heroId, setHeroId ] = useState<number|null>(null);    

    useEffect(()=>{
        if (heroCandlesListShow) {
            setHeroId(heroCandlesListShow.id);
        } else {
            setTimeout(()=>{
                setHeroId(null);
            },300);
        }
    },[heroCandlesListShow]);

    return (
        <Offcanvas 
            show={heroCandlesListShow!==null} 
            onHide={()=>setHeroCandlesListShow(null)}
            scroll
            placement="end"
            style={{width:500}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    {heroCandlesListShow?.name}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>   
                {heroId && <HeroCandleList heroId={heroId}/>} 
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default HeroCandlesListWidget;