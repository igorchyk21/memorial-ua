import { BigSlider, FaqBlock, InfoBlock, ItemsSlider } from "@/entities/content";
import { HeroesMainWidget } from "@/widgets";
import { _cnMainContainer } from "@/shared/const";
import { ContentPageMain, HeroShortType } from "@global/types";
import { getTranslations } from "next-intl/server";
import { Alert, AlertHeading, Container } from "react-bootstrap";

interface Props {
    pageContent:ContentPageMain|null;
    heroes:HeroShortType[]|null|undefined;
} 
 
const HomePage = async ({pageContent, heroes}:Props) => {
    const t = await getTranslations();
    return (<>
         
        {pageContent?.slides &&
        (<BigSlider  
            href="/heroes"
            buttonTitle={t('buttons.heroes')}
            slides={pageContent.slides}/>)}
        
        <Container className="pt-3"> 
            <Alert variant="primary" className="d-sm-flex pb-4 pt-sm-4">
            <i className="ci-tool fs-4 mt-1 mb-2 mb-sm-0"/>
            <div className="ps-sm-3 pe-sm-4">
                <AlertHeading className="mb-2">Триває розробка</AlertHeading>
                <p>
                    Платформа <b>«Віртуальна Алея Пам&apos;яті</b> перебуває на фінальному етапі розробки та тестування. 
                    Якщо Ви зіткнетесь із труднощами в роботі або непрацюючими функціями, будь ласка, 
                    спробуйте скористатися ними пізніше.
                </p>
                <hr className="text-primary opacity-25 my-3" />
                <p className="fw-bold">
                    Запуск у фінальній версії заплановано на січень 2026 року.
                </p>
            </div>
        </Alert>

        </Container>
 
        <Container> 
            <HeroesMainWidget heroes={heroes}/>
        </Container>

        

        {pageContent?.about &&
            (<InfoBlock 
                id="about"
                content={pageContent?.about}/>)}

        {pageContent?.features &&
            (<ItemsSlider 
                id="features"
                title={t('blocks.features')}
                items={pageContent.features}/>)}

        {pageContent?.faq && 
            (<FaqBlock
                id="faq"
                title={t('blocks.faq')}
                items={pageContent.faq}/>)}

    </>)

    
}

export default HomePage;