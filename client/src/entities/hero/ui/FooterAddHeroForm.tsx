"use client"
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap"

interface Props {
    onHeroAdd:(heroName:string)=>void;
}

const FooterAddHeroForm = ({onHeroAdd}:Props) => {
    const t = useTranslations();
    const refInput = useRef<HTMLInputElement>(null);
    return (
        <div className="border-bottom py-5">
            <Container className="py-sm-1 py-md-2 py-lg-3">
            <div className="text-center mx-auto" style={{ maxWidth: 580 }}>
                <h3 className="pb-1 mb-2">{t('hero.footerHeroTitle')}</h3>
                <p className="fs-sm text-body">{t('hero.footerHeroInfo')}</p>
                <Form
                    className="position-relative d-flex flex-column flex-sm-row gap-2 pt-3"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        if (refInput.current)
                            onHeroAdd(refInput.current?.value)
                    }}>
                <Form.Control
                    type="text"
                    size="lg"
                    ref={refInput}
                    className="rounded-pill text-start"
                    placeholder={t('hero.footerHeroName')}
                    aria-label="Your email address"
                    required/>
                
                <Button type="submit" size="lg" className="rounded-pill">
                    {t('hero.addHero')}
                </Button>
                </Form>
            </div>
            </Container>
        </div>
    )
}

export default FooterAddHeroForm;