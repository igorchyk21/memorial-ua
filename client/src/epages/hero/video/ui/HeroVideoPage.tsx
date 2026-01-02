import { HeroSlider } from "@/entities/hero";
import { HeroNavigate, HeroUploadVideo } from "@/features/hero";
import { HeroLayoutWidget, HeroVideosWidget } from "@/widgets";
import { HeroShortType, HeroVideoItem } from "@global/types"

interface Props {
    hero:HeroShortType;
    videos:HeroVideoItem[];
}
const HeroVideoPage = ({hero, videos}:Props) => { 
    return (<>
        <HeroNavigate/>
        <main className="container mx-auto p-4">
            <HeroLayoutWidget 
                hero={hero}>
                <div className="d-md-flex justify-content-between mb-2">
                    <h3 className="text-start">{`${hero.fName} ${hero.lName}`}</h3>
                    <HeroUploadVideo heroId={hero.ID}/>
                </div>
                <HeroVideosWidget
                    heroId={hero.ID} 
                    videos={videos}
                    heroName={`${hero.fName} ${hero.lName}`}/>
            </HeroLayoutWidget> 
        </main>
    </>)
}
 
export default HeroVideoPage; 