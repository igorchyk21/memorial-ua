"use client"
import { ButtonAccount, ButtonLocation, ButtonMenu, ButtonNewHero, ButtonSearch, ButtonTheme, Location, Logo, OffMenu } from "@/entities/header";
import { AccountMenu } from "@/features/account";
import { OffFilterLocation, SearchCollapse, SearchInput } from "@/features/heroes";
import { useAuth } from "@/shared/context/Auth";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useStickyElement } from "@/shared/hooks/ui/use-sticky-element";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";

const HeaderWidget = () => {

    const  t = useTranslations('map');
    const { auth } = useAuth();
    const { stickyElementRef, isStuck } = useStickyElement<HTMLDivElement>()
    const [ searchOpen, setSearchOpen ] = useState(false)
    const [ menuShow, setMenuShow ] = useState(false);
    const [ filterShow, setFilterShow ] = useState(false);
    const [ region ] = useQueryState<string>('region');
    
    return (<>
        <Navbar 
            ref={stickyElementRef}
            as="header"
            expand={true} 
            bg="body"
            
            className={`navbar-sticky border-bottom sticky-top d-block z-fixed py-1 py-lg-0 py-xl-1 px-0 ${isStuck ? ' is-stuck' : ''}`}>

            <Container className="justify-content-start py-0 py-lg-0">
                {/* Offcanvas menu toggler (Hamburger) */}
                <ButtonMenu onClick={()=>setMenuShow(true)}/>

                {/* Navbar brand (Logo) */}
                <Logo/>

                <div className="d-flex flex-grow-1">
                <ButtonNewHero onClick={()=>{}}/>

                <SearchInput/>

                 
                <Location onClick={()=>setFilterShow(true)} value={region ? t(region) : ''}/>
                 
                
                </div>

                <div className="d-flex align-items-center gap-1 gap-lg-2 ms-auto">
                    <ButtonTheme/>
                    <ButtonSearch 
                        searchOpen={searchOpen}
                        setSearchOpen={setSearchOpen}/>
                    
                    <ButtonLocation onClick={()=>setFilterShow(true)}/>
                    
                    {auth?.isLogin 
                    ?(<AccountMenu/>)
                    :(<ButtonAccount/>)}
                </div>
            </Container>
            <SearchCollapse
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}/>
        </Navbar>

        <OffMenu     
            show={menuShow}
            setShow={setMenuShow}/>
        
        
        <OffFilterLocation
            show={filterShow}
            setShow={setFilterShow}/>
        
    </>)
}

export default HeaderWidget;