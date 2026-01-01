"use client"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import useUploadPhoto from "../model/useUploadPhoto";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";

interface Props {
    heroId:number;
}

const HeroUploadPhoto = ({heroId}:Props) => {
    const t = useTranslations();
    const { refInputFile, handleChange, isConverting } = useUploadPhoto(heroId);
    return (<div>
        <Button 
            className="rounded-pill"
            disabled={isConverting}
            onClick={()=>refInputFile.current?.click()}>
            <SpinnerTitle
                showSpinner={isConverting}
                titleButton={<><i className="ci-upload me-2"/>{t('hero.photo.uploadPhoto')}</>}
                titleSpinner={t('hero.photo.uploadPhoto')}/>
            
        </Button> 
        <input
            className="d-none" 
            type="file"
            ref={refInputFile}
            multiple
            accept="image/*"
            onChange={handleChange}/>
    </div>)
}

export default HeroUploadPhoto;