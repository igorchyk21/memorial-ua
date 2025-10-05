"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {

    const { theme, resolvedTheme } = useTheme() 
    const [ logo, setLogo ] = useState(`/memorial/img/logo/big-light.png`);
    const [ logoSmall, setLogoSmall ] = useState(`/memorial/img/logo/small-light.png`);

    useEffect(()=>{
        console.log(resolvedTheme)
        setLogo(`/memorial/img/logo/big-${resolvedTheme}.png`);
        setLogoSmall(`/memorial/img/logo/small-${resolvedTheme}.png`)

    },[theme,resolvedTheme])

    return (
        <Link href="/" className="fs-2 p-0 pe-lg-2 pe-xxl-0 me-0 me-sm-3 me-md-4 me-xxl-5">
            
            <div className="navbar-brand d-inline-flex d-md-none ms-3 me-4" style={{height:80}}>
                <Image
                    src={logoSmall}
                    alt=""
                    width={50}
                    height={0}/>
            </div>

            <div className="navbar-brand d-none d-md-inline-flex" style={{height:90}}>
               <Image
                    src={logo}
                    alt=""
                    width={150}
                    height={66.8}/> 
            </div>     
        </Link>
    )
}

export default Logo;