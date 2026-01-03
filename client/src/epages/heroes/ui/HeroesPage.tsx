"use client"
import { useHeroSubscription } from "@/features/hero";
import { HeroList, HeroPaginator } from "@/features/heroes";
import { _cnMain } from "@/shared/const";
import { HeroesListHeadWidget } from "@/widgets";
import { HeroShortType, PaginatorType } from "@global/types";
import { Container } from "react-bootstrap";

interface Props {
    heroes:HeroShortType[];
    paginator:PaginatorType;
}

const HeroesPage = ({heroes, paginator}:Props) => {
    const { handleClickSubscription } = useHeroSubscription();
    return (
        <main className={_cnMain}> 
            <Container> 
                <HeroesListHeadWidget
                    countAllHeroes={paginator.countRows} /> 

                <HeroList 
                    onClickSubscription={handleClickSubscription}
                    className="mb-5"
                    heroes={heroes}/>
    
                <HeroPaginator paginator={paginator}/> 
            </Container> 
        </main>
    )
} 

export default HeroesPage;