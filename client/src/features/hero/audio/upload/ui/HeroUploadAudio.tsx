"use client"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import useUploadAudio from "../model/useUploadAudio";
import { useAuth } from "@/shared/context/Auth/model/useAuth";

interface Props {
    heroId:number;
}

const HeroUploadAudio = ({heroId}:Props) => {
    const t = useTranslations();
    const { auth } = useAuth();
    const { refInputFile, handleChange, handleAddAudio, isUploading } = useUploadAudio(heroId);

    return (
        <div className="d-flex justify-content-end flex-wrap gap-1">
            <Button 
                className="rounded-pill"
                style={{height:40}}
                disabled={isUploading}
                onClick={()=>handleAddAudio()}>
                <i className="ci-volume-2 me-2"/>{t('hero.audio.addAudio')}                
            </Button>

            {Boolean(auth?.user.admin) &&
            (<Button
                style={{height:40}}
                title={t('hero.audio.uploadAudio')}
                    className="rounded-pill px-3 text-center ms-2"
                    disabled={isUploading}
                    onClick={() => refInputFile.current?.click()}>
                        <i className="ci-upload"/>
                </Button>)}
            <input
                className="d-none"
                type="file"
                ref={refInputFile}
                multiple
                accept="audio/*"
                onChange={handleChange}
            />
        </div>
    );
};

export default HeroUploadAudio;


