"use client"
import { HeroSlider } from "@/entities/hero";
import { HeroBiography, HeroNavigate, useHeroBioDelete, useHeroBioEdit } from "@/features/hero";
import { HeroLayoutWidget } from "@/widgets";
import { HeroBiographyType, HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
    biography:HeroBiographyType;
}
const HeroBiographyPage = ({hero,biography}:Props) => { 
    
    const { handleEdit } = useHeroBioEdit(hero.ID);
    const { handleDelete } = useHeroBioDelete();
    
    return (<>
        <HeroNavigate/> 
        <main className="container mx-auto p-4">
            <HeroLayoutWidget 
                hero={hero}>
                <HeroBiography   
                    onClicEdit={handleEdit}
                    onClickDelete={handleDelete}
                    hero={hero}
                    biography={biography}/>
            </HeroLayoutWidget>
        </main>
    </>)
}
 
export default HeroBiographyPage; 