import { HeroNavigate, HeroUploadPhoto } from "@/features/hero";
import { HeroLayoutWidget, HeroPhotosWidget } from "@/widgets";
import { HeroPhotoItem, HeroShortType } from "@global/types"

interface Props {
    hero:HeroShortType;
    photos:HeroPhotoItem[]
} 
const HeroPhotoPage = ({hero, photos}:Props) => { 
    return (<>
        <HeroNavigate/> 
        <main className="container mx-auto p-4"> 
            <HeroLayoutWidget  
                hero={hero}>
                <div className="d-md-flex justify-content-between mb-2">
                <h3 className="text-start">{`${hero.fName} ${hero.lName}`}</h3>
                    <HeroUploadPhoto heroId={hero.ID}/> 
                </div>
                <HeroPhotosWidget
                    heroId={hero.ID}
                    photos={photos}
                    heroName={`${hero.fName} ${hero.lName}`}/>
            </HeroLayoutWidget> 
        </main> 
    </>)
}
 
export default HeroPhotoPage; 