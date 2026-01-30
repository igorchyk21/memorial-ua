import { NewHeroWidget } from "@/widgets";
import { useTranslations } from "next-intl";
import { Container } from "react-bootstrap"

const NewHeroPage = () => {

    const t = useTranslations();

    return (
        <Container className="p-4">
            <div className="d-sm-fle pb-4">
                <h3 className="text-start mb-0">{t('hero.newHeroTitle')}</h3>
                <span className="text-danger fw-bold d-block" style={{lineHeight:1.2}}>{t('hero.messNotActive')}</span>
            </div>
            <NewHeroWidget/>
        </Container>
    )
} 

export default NewHeroPage;