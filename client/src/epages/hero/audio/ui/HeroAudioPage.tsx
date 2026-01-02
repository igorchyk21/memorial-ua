import { HeroNavigate, HeroUploadAudio } from "@/features/hero";
import { HeroLayoutWidget, HeroAudiosWidget } from "@/widgets";
import { HeroShortType, HeroVideoItem } from "@global/types"

interface Props {
    hero:HeroShortType;
    audios:HeroVideoItem[];
}
const HeroAudioPage = ({hero, audios}:Props) => { 
    return (<>
        <HeroNavigate/>
        <main className="container mx-auto p-4">
            <HeroLayoutWidget 
                hero={hero}>
                <div className="d-md-flex justify-content-between mb-2">
                    <h3 className="text-start">{`${hero.fName} ${hero.lName}`}</h3>
                    <HeroUploadAudio heroId={hero.ID}/>
                </div>
                <HeroAudiosWidget
                    heroId={hero.ID}
                    audios={audios}
                    heroName={`${hero.fName} ${hero.lName}`}/> 
            </HeroLayoutWidget>
        </main> 
    </>)
}
 
export default HeroAudioPage;