import { NewHeroWidget } from "@/widgets";
import { useTranslations } from "next-intl";
import { Container } from "react-bootstrap"

const NewHeroPage = () => {

    const t = useTranslations();

    return (
        <Container className="p-4">
            <div className="d-sm-flex justify-content-between">
                <h3 className="text-start mb-0">{t('hero.newHeroTitle')}</h3>
            </div>
            <NewHeroWidget/>
        </Container>
    )
} 

export default NewHeroPage;