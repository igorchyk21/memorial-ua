import { HeroSlider } from "@/entities/hero/intex";
import { HeroAbout, HeroNavigate } from "@/features/hero";
import { HeroLayoutWidget } from "@/widgets";
import { HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
}
const HeroAboutPage = ({hero}:Props) => { 
    return (<>
        <HeroSlider hero={hero}/>
        <HeroNavigate/>
        <main className="container mx-auto p-5">
            <HeroLayoutWidget 
                hero={hero}>
                <HeroAbout/>
            </HeroLayoutWidget>
        </main>
    </>)
}
 
export default HeroAboutPage; 