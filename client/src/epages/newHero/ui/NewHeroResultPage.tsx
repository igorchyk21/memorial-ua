"use client"
import { useAuth } from "@/shared/context/Auth";
import { HeroShortType } from "@global/types"
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
 
interface Props {
    hero:HeroShortType;
}

const NewHeroResultPage = ({hero}:Props) => {
    const t = useTranslations();
    const { auth } = useAuth();
    return (<>
            <Container className="py-5 d-flex justify-content-center">
                <Card style={{maxWidth:800}}>
                    <Card.Body>
                        <h2 className="text-center">{hero.fName} {hero.lName}</h2>
                        <h6 className="text-center">{t('hero.create.info1')}</h6>
                        <h6 className="text-center">{t('hero.create.info2')}</h6>
                        <p className="text-center">{t('hero.create.info3')}</p>
                        <Row className="g-3">
                            <Col>
                                <Link
                                    className="btn btn-outline-primary w-100" 
                                    href="/">{t('buttons.toMain')}</Link>
                            </Col>
                            
                            <Col>
                                <Link
                                    className="btn btn-outline-primary w-100" 
                                    href="/new">{t('buttons.toAddHero')}</Link>      
                            </Col>

                            {auth?.user.admin &&
                            (<Col>
                            <Link
                                className="btn btn-primary w-100" 
                                href={`/hero/${hero.url}-${hero.ID}`}>{t('buttons.toHero')}</Link>
                            </Col>)}

                        </Row>
                </Card.Body>
                </Card>
            </Container>
    </>)
}

export default NewHeroResultPage
