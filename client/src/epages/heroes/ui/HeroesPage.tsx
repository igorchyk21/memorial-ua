"use client"
import { HeroList, HeroPaginator } from "@/features/heroes";
import { HeroesListHeadWidget } from "@/widgets";
import { HeroShortType, PaginatorType } from "@global/types";
import { Container } from "react-bootstrap";

interface Props {
    heroes:HeroShortType[];
    paginator:PaginatorType;
}

const HeroesPage = ({heroes, paginator}:Props) => {
    return (
        <Container> 
            <HeroesListHeadWidget
                countAllHeroes={paginator.countRows} /> 

            <HeroList 
                className="mb-5"
                heroes={heroes}/>
 
            <HeroPaginator paginator={paginator}/> 
        </Container> 
    )
} 

export default HeroesPage;