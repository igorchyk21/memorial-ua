"use client"
import { uploadFiles } from "@/entities/file";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { fileToWebpFile } from "@/shared/helper/imgFunctions/fileToWebpFile";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { AxiosProgressEvent } from "axios";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useUploadPhoto = (heroId:number) => {

    const t = useTranslations();
    const { showToast } = useToast();
    const [ isConverting, setIsConverting ] = useState(false);
    const refInputFile = useRef<HTMLInputElement>(null)
    const [ update, setUpdate ] = useQueryState<string>('update');
    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
        //console.log(progressEvent)
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsConverting(true);
        try {
            const files = e.target.files;
            if (!files) return null;
            const formData = new FormData();  
            const uFiles:File[] = [];

            const reToken  = executeRecaptcha ? await executeRecaptcha('form') : null;
            for(let i = 0; i<files.length; i ++ ) {
                const file = files[i];
                const _file = (file.type.startsWith('image/')) ? await fileToWebpFile(file) : file;  
                uFiles.push(_file || file);
            }
    
            const resUpload = await uploadFiles(uFiles, handleUploadProgress, `hero/photo/${heroId}`, '', reToken)
            if (resUpload?.stat) showToast(t('hero.messPhotoUpload'), 'success')
                else showToast(t('hero.photo.errorUpload'), 'danger')

            setUpdate(Date.now().toString());
        } finally {
            setIsConverting(false);
            setTimeout(() => {
            if (refInputFile.current)
                refInputFile.current.value = '';  
            }, 0);
        }
    }

    return {
        refInputFile,
        handleChange,
        isConverting
    }
}

export default useUploadPhoto;