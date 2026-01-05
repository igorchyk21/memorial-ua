"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Container, Dropdown, DropdownDivider, Nav, NavItem, NavLink, TabContainer } from "react-bootstrap"
import DropdownMore from "./DropdownMore";
import { useTranslations } from "next-intl";

 
const HeroNavigate = () => {

    const t = useTranslations();
    const pathName = usePathname();
    const aPathName = pathName.split('/');
    const heroUrl = aPathName?.[2]||'';
  
    return (
        <Container fluid className="px-0 hero-navigate">
            <TabContainer defaultActiveKey="about" >
                <Nav variant="tabs" className="mb-3 rounded-0 py-2"   >
                <Container className="d-flex gap-2" >

                    <NavItem style={{maxWidth:150}} className="px-1">
                        <NavLink as={Link}
                            className={`px-1 ${!aPathName?.[3] && 'active'}`} 
                            href={`/hero/${heroUrl}`}>
                                <i className="ci-user me-2 d-none d-md-flex" />
                                {t('hero.navigate.about')}
                            </NavLink>
                    </NavItem>

                    <NavItem style={{maxWidth:150}}>
                        <NavLink as={Link}
                            className={`px-1 ${aPathName?.[3] === 'biography' && 'active'}`}
                            href={`/hero/${heroUrl}/biography`}>
                                <i className="ci-book-open me-2 d-none d-md-flex" />
                                {t('hero.navigate.biography')}
                            </NavLink>
                    </NavItem>
                    
                    <NavItem className="d-none d-md-block" style={{maxWidth:150}}>
                        <NavLink as={Link}
                            className={`px-1 ${aPathName?.[3] === 'photo' && 'active'}`}
                            href={`/hero/${heroUrl}/photo`}>
                                <i className="ci-image me-2" />
                                {t('hero.navigate.photo')}
                            </NavLink>
                    </NavItem>

                    <NavItem className="d-none d-md-block" style={{maxWidth:100}}>
                        <NavLink as={Link}
                            className={`px-1 ${aPathName?.[3] === 'video' && 'active'}`}
                            href={`/hero/${heroUrl}/video`}>
                                <i className="ci-video me-2" />
                                {t('hero.navigate.video')}
                            </NavLink>
                    </NavItem>

                    <NavItem className="d-none d-md-block" style={{maxWidth:100}}>
                        <NavLink as={Link}
                            className={`px-1 ${aPathName?.[3] === 'audio' && 'active'}`}
                            href={`/hero/${heroUrl}/audio`}>
                                <i className="ci-volume-2 me-2" />
                                {t('hero.navigate.audio')}
                            </NavLink>
                    </NavItem>

                    <NavItem className="d-none d-md-block" style={{maxWidth:100}}>
                        <NavLink as={Link}
                            className={`px-1 ${aPathName?.[3] === 'candles' && 'active'}`}
                            href={`/hero/${heroUrl}/candles`}>
                                <i className="ci-sun me-2" />
                                {t('hero.navigate.candles')}
                            </NavLink>
                    </NavItem>
                    
 
                    <DropdownMore aPathName={aPathName}/> 

                </Container>
                </Nav>
                
            </TabContainer>

        </Container>
    )
}

export default HeroNavigate;