import { HeroSlider } from "@/entities/hero";
import { HeroNavigate, HeroUploadVideo } from "@/features/hero";
import { HeroLayoutWidget } from "@/widgets";
import { HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
}
const HeroVideoPage = ({hero}:Props) => { 
    return (<>
        <HeroNavigate/>
        <main className="container mx-auto p-4">
            <HeroLayoutWidget 
                hero={hero}>
                <div className="d-flex justify-content-between">
                    <h3 className="text-start">{`${hero.fName} ${hero.lName}`}</h3>
                    <HeroUploadVideo heroId={hero.ID}/>
                </div>
            </HeroLayoutWidget> 
        </main>
    </>)
}
 
export default HeroVideoPage; 