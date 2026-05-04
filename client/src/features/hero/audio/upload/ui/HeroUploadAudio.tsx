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
    const { auth, setShowOffAuth } = useAuth();
    const { refInputFile, handleChange, handleAddAudio, isUploading } = useUploadAudio(heroId);

    return (
        <div className="d-flex justify-content-end flex-wrap gap-1">
             
            <Button
                style={{height:40}}
                title={t('hero.audio.uploadAudio')}
                    className="rounded-pill px-3 text-center ms-2"
                    disabled={isUploading}
                    onClick={() => {
                        if (Boolean(auth?.user.admin))
                            refInputFile.current?.click();
                        else
                            setShowOffAuth('login');
                        
                    }}>
                        <i className="ci-volume-2 me-2"/>{t('hero.audio.addAudio')}        
                </Button> 
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


