"use client"
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {

    const { theme, resolvedTheme } = useTheme() 
    const [ logo, setLogo ] = useState(`/memorial/img/logo/big-light.png`);
    const [ logoSmall, setLogoSmall ] = useState(`/memorial/img/logo/small-light.png`);
    const t = useTranslations();
    useEffect(()=>{
        setLogo(`/memorial/img/logo/big-${resolvedTheme}.png`);
        setLogoSmall(`/memorial/img/logo/small-${resolvedTheme}.png`)

    },[theme,resolvedTheme])
     
 
    return (
        <Link href="/" className="fs-2 py-3 pe-lg-2 pe-xxl-0 me-0 me-sm-1 me-md-4 me-xxl-5 d-flex text-dark-emphasis nav-link align-items-center " >
            <div>
            <Image
                src="/logo.png"
                alt=""
                width={50}
                height={0}/>
            </div>
            <h2 className="d-none d-md-block pt-1 ps-2 pb-0 mb-0" style={{fontSize:18}}>{t('titleLogo1')}<br/> {t('titleLogo2')}</h2> 
        </Link>
    )
}

export default Logo;