"use client"
import { FooterInfo, FooterLinks } from "@/entities/footer";
import { FooterAddHeroForm } from "@/entities/hero";
import { useRouter } from "@bprogress/next";
import { useTranslations } from "next-intl";
import { Container, Row } from "react-bootstrap";
import { DateTime } from "luxon";
import AlertEmpty from "@/shared/ui/other/AlertEmpty";

const FooterWidget = () => {
    const router = useRouter();
    const t = useTranslations();
    return (
    <footer className="footer bg-dark pb-4" data-bs-theme="dark">
             
            <FooterAddHeroForm onHeroAdd={(heroName)=>router.push(`/new/?hero=${heroName}&update=${Date.now().toString()}`)}/> 

            <Container className="py-4 py-md-5">
                <Row className="pt-3 pb-4 py-md-1 py-lg-3">
                    <FooterInfo/>
                    <FooterLinks/>

                </Row>
                <Row>
                <AlertEmpty className="mt-0 mb-5 text-center"/>
                </Row>
                
            </Container>
            
            <p className="fs-14 text-center fw-bold text-white"> © {DateTime.now().year} {t('footer.bottomInfo')}</p>
        </footer>
    )
}

export default FooterWidget;