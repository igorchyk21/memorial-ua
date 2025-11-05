"use client"
import { HeroSlider } from "@/entities/hero";
import { HeroAbout, HeroNavigate, useHeroDelete, useHeroEdit, } from "@/features/hero";
import { HeroLayoutWidget, HeroPostsListWidget } from "@/widgets";
import { HeroPostType, HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
    posts:HeroPostType[]|null;
}
const HeroAboutPage = ({hero,posts}:Props) => { 
    
    const { handleClickEdit, handleClickStatus } = useHeroEdit(hero);
    const { handleClickDelete } = useHeroDelete(hero.ID, `${hero.lName} ${hero.fName}`)

    return (<>
        <HeroSlider hero={hero}/>
        <HeroNavigate/>
        <main className="container mx-auto p-5">
            <HeroLayoutWidget 
                hero={hero}>
                <HeroAbout 
                    hero={hero}
                    onClickEdit={handleClickEdit}
                    onClickStatus={handleClickStatus}
                    onClickDelete={handleClickDelete}/>    
                <HeroPostsListWidget 
                    heroId={hero.ID}
                    posts={posts||[]}/>
            </HeroLayoutWidget>
        </main>
    </>)
} 
 
export default HeroAboutPage; 