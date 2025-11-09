"use client"
import { FooterInfo, FooterLinks } from "@/entities/footer";
import { FooterAddHeroForm } from "@/entities/hero";
import { useRouter } from "@bprogress/next";
import { Container, Row } from "react-bootstrap";

const FooterWidget = () => {
    const router = useRouter();

    return (
    <footer className="footer bg-dark pb-4" data-bs-theme="dark">
             
            <FooterAddHeroForm onHeroAdd={(heroName)=>router.push(`/new/?hero=${heroName}&update=${Date.now().toString()}`)}/> 

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