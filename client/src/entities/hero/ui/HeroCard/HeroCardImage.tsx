"use client"
import { ensureImageLoads } from "@/shared/helper/imgFunctions/ensureImageLoads";
import LinkWrapper from "@/shared/ui/other/LinkWrapper";
import { CommonComponentProps } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, Placeholder } from "react-bootstrap";

interface HeroCardImageProps extends CommonComponentProps {
    href:string|null;
    src:string;
    width:number;
    height:number;
    placeholderStyle?:React.CSSProperties;
    imageStyle?:React.CSSProperties; 
    alt?:string;
}


const HeroCardImage = (p:HeroCardImageProps) => {

    const t = useTranslations('hero');
    const [ error, setError ] = useState(false);
    const [ src, setSrc ] = useState<string|null|boolean>(null);

    useEffect(()=>{
        (async()=>{
            const src = await ensureImageLoads(p.src);
            setSrc(src ? p.src : false);
        })()
    },[])

    
    return (
        <div className={p.className} style={{...p.style, maxWidth:'100%'}}>
        {error 
            ?(<Placeholder as="div" animation="glow" className="position-relative  "> 
                <Placeholder className="ratio ratio-1x1 rounded-4"  style={{aspectRatio:500/550, ...p.placeholderStyle}}/> 
                <i className="ci-image position-absolute top-50 start-50 translate-middle fs-1 opacity-40" />
            </Placeholder>)
            
            :(<div className="position-relative d-flex hover-effect-opacity overflow-hidden rounded-4" >
                <LinkWrapper
                    href={p.href}
                    style={{ maxWidth:'100%'}}
                    className="hover-effect-opacity position-relative d-block">
                    {typeof src === 'string' && (src !== '') &&
                    (<Image 
                        width={p.width}
                        height={p.height}
                        style={{objectFit:'cover', aspectRatio:500/550, ...p.imageStyle}}
                        src={src}
                        onError={()=>setError(true)}
                        className="rounded-4 hero-img" 
                        alt={p?.alt||'photo'}/>)}

                    {src === null && 
                        (<div
                            className="rounded-4 hero-img d-flex bg-primary "   
                            style={{width:p.width, maxWidth:'100%', aspectRatio:500/550, opacity:0.5}}>
                                
                        </div>
                        )}

                    {src === false && 
                        (<div
                            className="rounded-4 hero-img bg-secondary d-flex"  
                            style={{width:p.width, maxWidth:'100%', aspectRatio:500/550, ...p.imageStyle}}>
                                <h5 className="m-auto underline-none" style={{textDecoration:'unset'}}>{t('waitPhoto')}</h5>
                        </div>)}
                </LinkWrapper>
            </div>)}
        </div>
    )
}

export default HeroCardImage;