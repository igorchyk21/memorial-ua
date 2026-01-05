import { HeroSlider } from "@/entities/hero";
import { HeroCandleList, HeroNavigate, HeroUploadVideo } from "@/features/hero";
import { HeroLayoutWidget, HeroVideosWidget } from "@/widgets";
import { HeroCandleType, HeroShortType, HeroVideoItem } from "@global/types"

interface Props {
    hero:HeroShortType;
    candles?:HeroCandleType[]|null;
}
const HeroCandlesPage = ({hero, candles}:Props) => { 
    return (<>
        <HeroNavigate/>
        <main className="container mx-auto p-4">
            <HeroLayoutWidget 
                hero={hero}>
                <div className="d-md-flex justify-content-between mb-2">
                    <h3 className="text-start">{`${hero.fName} ${hero.lName}`}</h3>
                     
                </div>
                <HeroCandleList heroId={hero.ID} startCandles={candles}/>   
            </HeroLayoutWidget> 
        </main>
    </>)
}
 
export default HeroCandlesPage; 