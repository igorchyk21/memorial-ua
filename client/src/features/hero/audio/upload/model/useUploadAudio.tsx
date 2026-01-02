"use client"
import { uploadFiles } from "@/entities/file";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { AxiosProgressEvent } from "axios";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import UploadAudioForm from "../ui/UploadAudioForm";
import { heroSendAudioByLink } from "@/entities/hero/model/heroModel";

const useUploadAudio = (heroId: number) => {

    const t = useTranslations();
    const { showToast } = useToast(); 
    const [isUploading, setIsUploading] = useState(false);
    const refInputFile = useRef<HTMLInputElement>(null);
    const [, setUpdate] = useQueryState<string>('update');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { showDialog, hideDialog } = useModal();
    const refInputTextarea = useRef<HTMLTextAreaElement>(null);
    const refInputLink = useRef<HTMLInputElement>(null);
       
    const handleUploadProgress = (_progressEvent: AxiosProgressEvent) => {
        // can be used for progress bar in future
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        showDialog({
            open: true,
            title: t('hero.audio.uploadAudio'),
            onHide:()=>{
                if (refInputFile.current)
                    refInputFile.current.value = '';
            },
            content: <UploadAudioForm 
                        uploadMode="file"
                        refInputTextarea={refInputTextarea}
                        uploadFileName={files[0]?.name}/>,
            buttons: [
                {   title: t('hero.audio.uploadAudio'), 
                    onClick: async ()=>await uploadAudio(files) }
            ]
        });            
    };

    const uploadAudio = async (files: FileList) => {
        try {
            setIsUploading(true);
            const uFiles: File[] = [];
            const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
            
            for(let i = 0; i<files.length; i ++ ) {
                const file = files[i];
                uFiles.push(file);
            }

            const resUpload = await uploadFiles(uFiles, handleUploadProgress, `hero/audio/${heroId}`, refInputTextarea.current?.value||'', reToken); 
            if (resUpload?.stat) showToast(t('hero.messAudioUpload'), 'success');
            else showToast(t('hero.audio.errorUpload'), 'danger');
            setUpdate(Date.now().toString());
        } finally {
            setIsUploading(false);
            setTimeout(() => {
                if (refInputFile.current)
                    refInputFile.current.value = '';
            }, 0);
        }
        
    }

    const addAudioByLink = async () => {
        const audioLink = refInputLink.current?.value;
        if (!audioLink) return;
        const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
        const resSend = await heroSendAudioByLink(heroId, audioLink, refInputTextarea.current?.value||'', reToken);
        if (!resSend) return showToast(t('hero.audio.errorSend'), 'danger');
        showToast(t('hero.audio.successSend'), 'success');
        setUpdate(Date.now().toString());
        hideDialog();
    }
       

    const handleAddAudio = async () => {
        showDialog({
            open: true,
            title: t('hero.audio.addAudio'), 
            noCloseOnClickButton: true,
            content: <UploadAudioForm 
                        refInputLink={refInputLink}
                        refInputTextarea={refInputTextarea}/>,
            buttons: [
                {   title: t('hero.audio.addAudio'), 
                    onClick: async ()=>await addAudioByLink() }
            ]
        }); 
    }

    return {
        refInputFile,
        handleChange,
        isUploading,
        handleAddAudio
    };
};

export default useUploadAudio;



