import { HeroSlider } from "@/entities/hero/intex";
import { HeroNavigate } from "@/features/hero";
import { HeroLayoutWidget } from "@/widgets";
import { HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
}
const HeroAudioPage = ({hero}:Props) => { 
    return (<>
        <HeroNavigate/>
        <main className="container mx-auto p-5">
            <HeroLayoutWidget 
                hero={hero}>
                <h1>Audio</h1>
            </HeroLayoutWidget>
        </main>
    </>)
}
 
export default HeroAudioPage;