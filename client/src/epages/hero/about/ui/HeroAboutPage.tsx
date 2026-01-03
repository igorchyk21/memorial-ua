"use client"
import { HeroSlider } from "@/entities/hero";
import { HeroAbout, HeroNavigate, useHeroDelete, useHeroEdit, useHeroSubscription, } from "@/features/hero";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";
import { HeroLayoutWidget, HeroPostsListWidget } from "@/widgets";
import { HeroPostType, HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
    posts:HeroPostType[]|null;
}
const HeroAboutPage = ({hero,posts}:Props) => { 
    
    const { handleClickEdit, handleClickStatus } = useHeroEdit(hero);
    const { handleClickDelete } = useHeroDelete(hero.ID, `${hero.lName} ${hero.fName}`);
    const { handleClickSubscription } = useHeroSubscription();
    return (
        <> 
            <HeroSlider 
                onClickSubscription={handleClickSubscription}
                hero={hero}/>
            <HeroNavigate/>
            <main className="container mx-auto p-4">
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