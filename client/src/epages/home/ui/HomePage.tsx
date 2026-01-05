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
            buttonTitle={t('buttons.allHeroes2')}
            slides={pageContent.slides}/>)}
        
       
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