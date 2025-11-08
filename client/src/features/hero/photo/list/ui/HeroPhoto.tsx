import { HeroStatus } from "@/entities/hero";
import conf from "@/shared/config/conf"
import Lightbox from "@/shared/ui/img/Lightbox"
import { HeroPhotoItem } from "@global/types"
import Image from "next/image";

interface Props {
    photo:HeroPhotoItem;
    heroName?:string;
}
 
const HeroPhoto = ({photo, heroName}:Props) => {
    return (
        <Lightbox
        href={`${conf.dataUrl}/${photo.url}`}
        gallery="productGallery"
        className="hover-effect-scale hover-effect-opacity position-relative d-flex rounded-4 overflow-hidden">
        <div className="position-relative">
            <i className="ci-zoom-in hover-effect-target fs-3 text-white position-absolute top-50 start-50 translate-middle opacity-0 z-2" />                
            <Image 
                className="hero-photo"
                src={`${conf.dataUrl}/${photo.url}`}
                alt={`${heroName||''}`}
                width={600}
                height={0}
                placeholder="blur"
                blurDataURL="/memorial/img/placeholder.jpg"
                loading="lazy"
                style={{aspectRatio:1, objectFit:'cover'}}/>
            <div className="position-absolute" style={{top:3,left:-3}}>
                    <HeroStatus status={photo.status}/>
            </div>
        </div>
        </Lightbox>
    )
}

export default HeroPhoto;