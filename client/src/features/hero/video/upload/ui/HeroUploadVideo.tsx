"use client"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import useUploadVideo from "../model/useUploadVideo";
import { useAuth } from "@/shared/context/Auth/model/useAuth";

interface Props {
    heroId:number;
}

const HeroUploadVideo = ({heroId}:Props) => {
    const t = useTranslations();
    const { auth } = useAuth();
    const { refInputFile, handleChange, handleAddYoutubeVideo, isConverting } = useUploadVideo(heroId);

    return (
        <div className="d-flex justify-content-end flex-wrap gap-1">
            <Button 
                className="rounded-pill"
                style={{height:40}}
                disabled={isConverting}
                onClick={()=>handleAddYoutubeVideo()}>
                <i className="ci-youtube me-2"/>{t('hero.video.addVideo')}                
            </Button> 

            {Boolean(auth?.user.admin) &&
            (<Button
                style={{height:40}}
                title={t('hero.video.uploadVideo')}
                    className="rounded-pill px-3 text-center ms-2"
                    disabled={isConverting}
                    onClick={() => refInputFile.current?.click()}>
                        <i className="ci-upload"/>
                </Button>)}
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