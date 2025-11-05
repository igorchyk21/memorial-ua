"use client"
import { FooterInfo, FooterLinks } from "@/entities/footer";
import { FooterAddHeroForm } from "@/entities/hero";
import { Container, Row } from "react-bootstrap";

const FooterWidget = () => {
    return (
    <footer className="footer bg-dark pb-4" data-bs-theme="dark">
             
            <FooterAddHeroForm onHeroAdd={(heroName)=>console.log(heroName)}/>

            <Container className="py-4 py-md-5">
                <Row className="pt-3 pb-4 py-md-1 py-lg-3">
                    <FooterInfo/>
                    <FooterLinks/>

                </Row>
            </Container>
        </footer>
    )
}

export default FooterWidget;