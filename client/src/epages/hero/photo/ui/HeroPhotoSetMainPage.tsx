"use client"
import { HeroNavigate, HeroPhotoSetMain } from "@/features/hero";
import { useAuth } from "@/shared/context/Auth";
import { HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
    heroId:number;
    heroName:string;
    photo:HeroPhotoItem;
}
const HeroPhotoSetMainPage = ({heroId, heroName, photo}: Props) => {


    const t = useTranslations();
    const path = usePathname();
    const { auth } = useAuth();
    
    const aPath = path.split('/');

    useEffect(()=>{
        if (!auth?.user.admin) notFound();
    },[auth])
    
    if (!auth?.user.admin) null;
    return (<>
        <HeroNavigate/> 
        <main className="container mx-auto p-4"> 
            <div className="d-sm-flex justify-content-between">
                <div>
                <h3 className="text-start mb-0">{heroName}</h3>
                <h6>{t('hero.photo.setMain')}</h6>
                </div>
                <div className="text-end">
                    <Link 
                        className="fs-14 text-primary" href={aPath.filter((u,i)=>i!==aPath.length-1).join('/')}>
                            <i className="ci-arrow-left"/>
                            {t('buttons.back')}
                        </Link>
                </div>
            </div>
        <HeroPhotoSetMain 
                heroId={heroId}
                photo={photo}/>
        </main>
        </>);
}
 
export default HeroPhotoSetMainPage;