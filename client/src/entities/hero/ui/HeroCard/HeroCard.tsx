"use client"
import Link from "next/link"
import { Badge, Button } from "react-bootstrap"
import HeroCardImage from "./HeroCardImage"
import { HeroShortType } from "@global/types"
import conf from "@/shared/config/conf";
import { DateTime as DT } from "luxon";
import HeroStatus from "./HeroStatus";
import { useAuth } from "@/shared/context/Auth";

interface Props {
    hero:HeroShortType;
    showName?:boolean;
}

const HeroCard = ({hero, showName=true}:Props) => {
    const { auth } = useAuth();
    return ( 
        <article className="hero" style={{maxWidth:350, marginInline:'auto'}}>
            <div className="animate-underline hover-effect-opacity p-3 position-relative">

                <div className="position-relative mb-2 ounded-4 overflow-hidden">
                    <Badge
                        className="position-absolute top-0 start-0 z-2 mt-2 ms-2 mt-sm-3 ms-sm-3">
                        {hero.callSign}
                    </Badge>
                    <Button
                        type="button"
                        className="btn btn-icon btn-secondary animate-pulse fs-base bg-transparent border-0 position-absolute top-0 end-0 z-2 mt-1 mt-sm-2 me-1 me-sm-2">
                        <i className={`${true ? 'ci-heart-filled' : 'ci-heart'} animate-target text-white`} />
                    </Button>
                    <div className="cr cr-bottom cr-left cr-sticky cr-black fs-12">
                        {DT.fromMillis(hero.death||0).setLocale("uk").toLocaleString(DT.DATE_MED)}
                    </div> 
                    <Link
                        href={`/hero/${hero.url ? `${hero.url}-` : ''}${hero.ID}`}
                        className={`d-flex rounded p-0 underline-none`}>
                        
                        <HeroCardImage
                                src={`${conf.dataUrl}/${hero.photo}`}
                                href={null}
                                width={350}
                                height={0}/> 
                    </Link>

                    {auth?.user.admin &&
                    (<div className="position-absolute p-2" style={{bottom:0, right:0}}>
                        <HeroStatus status={hero.status}/>
                    </div>)}
                </div>

                

                {showName &&
                (<div className="nav mb-4">
                <Link className="nav-link animate-target min-w-0 text-dark-emphasis p-0"
                    href={`/hero/${hero.url ? `${hero.url}-` : ''}${hero.ID}`}>
                    <span className="text-truncate mt-2 fs-18">{hero.lName} {hero.fName}</span>
                </Link>
                </div>)}
                
            </div>
        </article>        
    )
}

export default HeroCard;