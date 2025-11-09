import { HeroStatus } from "@/entities/hero";
import conf from "@/shared/config/conf"
import Lightbox from "@/shared/ui/img/Lightbox"
import BlockSpinner from "@/shared/ui/spinners/BlockSpinner";
import { SpinnerIcon } from "@bprogress/next";
import { HERO_PHOTO_STAT, HeroPhotoItem } from "@global/types"
import Image from "next/image";
import { Spinner } from "react-bootstrap";

interface Props {
    photo:HeroPhotoItem;
    heroName?:string;
    showSpinner?:boolean;
}
 
const HeroPhoto = ({photo, heroName, showSpinner}:Props) => {
    return (
        <Lightbox
        href={`${conf.dataUrl}/${photo.url}`}
        gallery="productGallery"
        className="hover-effect-scale hover-effect-opacity position-relative d-flex rounded-4 overflow-hidden">
        <div className="position-relative">
            <BlockSpinner show={showSpinner}/>
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
                    {photo.status != HERO_PHOTO_STAT.ACTIVE &&
                    (<HeroStatus status={photo.status}/>)}
            </div>
        </div>
        </Lightbox>
    )
}

export default HeroPhoto;