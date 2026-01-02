"use client"
import { uploadFiles } from "@/entities/file";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { fileToWebVideoFile } from "@/shared/helper/videFunctions/fileToWebVideoFile";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { AxiosProgressEvent } from "axios";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import UploadForm from "../ui/UploadForm";
import { parseYouTubeUrl } from "@/shared/helper/videFunctions/parseYouTubeUrl";
import { heroSendVideoToYouTube } from "@/entities/hero/model/heroModel";

const useUploadVideo = (heroId: number) => {

    const t = useTranslations();
    const { showToast } = useToast(); 
    const [isConverting, setIsConverting] = useState(false);
    const refInputFile = useRef<HTMLInputElement>(null);
    const [, setUpdate] = useQueryState<string>('update');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { showDialog, hideDialog } = useModal();
    const refInputTextarea = useRef<HTMLTextAreaElement>(null);
    const refInputYoutubeLink = useRef<HTMLInputElement>(null);

    const handleUploadProgress = (_progressEvent: AxiosProgressEvent) => {
        // can be used for progress bar in future
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        showDialog({
            open: true,
            title: t('hero.video.uploadVideo'),
            onHide:()=>{
                if (refInputFile.current)
                    refInputFile.current.value = '';
            },
            content: <UploadForm 
                        uploadMode="video"
                        refInputTextarea={refInputTextarea}
                    
                    uploadFileName={files[0]?.name}/>,
            buttons: [
                {   title: t('hero.video.uploadVideo'), 
                    onClick: async ()=>await uploadVideo(files) }
            ]
        });            
    };

    const uploadVideo = async (files: FileList) => {
        try {
            const uFiles: File[] = [];
            const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
            
            for(let i = 0; i<files.length; i ++ ) {
                const file = files[i];
                const _file = null;//(file.type.startsWith('video/')) ? await fileToWebVideoFile(file) : file;  
                uFiles.push(_file || file);
            }

            const resUpload = await uploadFiles(uFiles, handleUploadProgress, `hero/video/${heroId}`, refInputTextarea.current?.value||'', reToken); 
            if (resUpload?.stat) showToast(t('hero.messVideoUpload'), 'success');
            else showToast(t('hero.video.errorUpload'), 'danger');
            setUpdate(Date.now().toString());
        } finally {
            setIsConverting(false);
            setTimeout(() => {
                if (refInputFile.current)
                    refInputFile.current.value = '';
            }, 0);
        }
        
    }

    const addYoutubeVideo = async () => {
        const youtubeLink = refInputYoutubeLink.current?.value;
        if (!youtubeLink) return;
        const { valid, videoId, embedUrl, reason } = parseYouTubeUrl(youtubeLink);
        if (!valid) return showToast(t('hero.video.errorYoutubeLink'), 'danger');
        const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
        const resSend = await heroSendVideoToYouTube(heroId, youtubeLink, refInputTextarea.current?.value||'', reToken);
        if (!resSend) return showToast(t('hero.video.errorSendToYouTube'), 'danger');
        showToast(t('hero.video.successSendToYouTube'), 'success');
        setUpdate(Date.now().toString());
        hideDialog();
    }
       

    const handleAddYoutubeVideo = async () => {
        showDialog({
            open: true,
            title: t('hero.video.addVideo'), 
            noCloseOnClickButton: true,
            onHide:()=>{
                if (refInputFile.current)
                    refInputFile.current.value = '';
            },
            content: <UploadForm 
                        refInputYoutubeLink={refInputYoutubeLink}
                        refInputTextarea={refInputTextarea}
                        uploadMode="youtube"/>,
            buttons: [
                {   title: t('hero.video.addVideo'), 
                    onClick: async ()=>await addYoutubeVideo() }
            ]
        }); 
    }

    return {
        refInputFile,
        handleChange,
        isConverting,
        handleAddYoutubeVideo
    };
};

export default useUploadVideo;


