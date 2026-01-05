"use client"
import { useHeroSubscription } from "@/features/hero";
import { HeroListMain } from "@/features/heroes";
import { HeroShortType } from "@global/types";
import { useTranslations } from "next-intl";

interface Props {
    heroes:HeroShortType[]|null|undefined;
}
 
const HeroesMainWidget = ({heroes}:Props) => {
    const t = useTranslations();
    const { handleClickSubscription } = useHeroSubscription();
    return (<>
        {heroes &&
            (<HeroListMain  
                title={t('blocks.ourHeroes')} 
                linkTitle={t('buttons.allHeroes')}
                linkHref="/heroes"
                onClickSubscription={handleClickSubscription}
                heroes={heroes}/>)}
    </>)
}

export default HeroesMainWidget;