"use client"
import conf from "@/shared/config/conf";
import ImageCropper from "@/shared/ui/ImageCropper/ImageCropper";
import { HeroPhotoItem } from "@global/types";
import useSetMainPhoto from "../model/useSetMainPhoto";

interface Props {
    heroId:number;
    photo:HeroPhotoItem;
}
 
const HeroPhotoSetMain = ({heroId, photo}:Props) => {
    const { handleCrop, isUpload} = useSetMainPhoto(heroId)
    return (<>
        <ImageCropper  
                editMode={true}
                loaded={isUpload}
                disabled={isUpload}
                imageUrl={`${conf.dataUrl}/${photo.url}`} 
                onCrop={handleCrop}/>
    </>)
}

export default HeroPhotoSetMain;