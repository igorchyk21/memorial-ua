"use client"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import useUploadVideo from "../model/useUploadVideo";

interface Props {
    heroId:number;
}

const HeroUploadVideo = ({heroId}:Props) => {
    const t = useTranslations();
    const { refInputFile, handleChange, handleAddYoutubeVideo, isConverting } = useUploadVideo(heroId);

    return (
        <div>

            <Button 
                className="rounded-pill"
                disabled={isConverting}
                onClick={()=>handleAddYoutubeVideo()}>
                <i className="ci-youtube me-2"/>{t('hero.video.addVideo')}                
            </Button> 


            <Button
                style={{height:40}}
                title={t('hero.video.uploadVideo')}
                className="rounded-pill px-3 text-center ms-2"
                disabled={isConverting}
                onClick={() => refInputFile.current?.click()}>
                    <i className="ci-upload"/>
            </Button>
            <input
                className="d-none"
                type="file"
                ref={refInputFile}
                multiple
                accept="video/*"
                onChange={handleChange}
            />
        </div>
    );
};

export default HeroUploadVideo;