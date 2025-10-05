import { BigSlider, FaqBlock, InfoBlock, ItemsSlider } from "@/entities/content";
import { HeroListMain } from "@/features/heroes";
import { _cnMainContainer } from "@/shared/const";
import { ContentBaseType, ContentPageMain, HeroShortType } from "@global/types";
import { getTranslations } from "next-intl/server";
import { Container } from "react-bootstrap";

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
        
        <Container> 
            {heroes &&
                (<HeroListMain 
                    title={t('blocks.candleTitle')}
                    linkTitle={t('buttons.allHeroes')}
                    linkHref="/heroes"
                    heroes={heroes}/>)}
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