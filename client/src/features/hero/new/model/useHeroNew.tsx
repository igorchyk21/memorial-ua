"use client"
import { uploadFiles } from "@/entities/file";
import { heroCreate, heroExists } from "@/entities/hero"
import { useAuth } from "@/shared/context/Auth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { fileToWebpFile } from "@/shared/helper/imgFunctions/fileToWebpFile";
import { transliterateAndSanitize } from "@/shared/helper/string/stringHelper"
import { useRouter } from "@bprogress/next";
import { HeroShortType } from "@global/types"
import { useTranslations } from "next-intl";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const useHeroNew = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha(); 
    const { auth } = useAuth();
    const router = useRouter();

    const handleSubmit = async (values:HeroShortType) => {
        if ((!auth?.user.admin) && ((values?.publicPhone?.length || 0)<13)) 
            return showToast(t('hero.errors.phone'),'danger');
  
 
        // Перевіряємо чи герой існує
        const resExists = await heroExists(`${values.fName} ${values.lName}`, values.birth, values.death); 
        if (resExists) return showToast(t('hero.errors.exists'), 'danger'); 
         
        // Ствоорення героя
        const reToken  = executeRecaptcha ? await executeRecaptcha('form') : null; 
        const { publicPhotos, ...hero } = values;
        hero.url = transliterateAndSanitize(`${hero.fName}-${hero.lName}`)
        const resCreateId = await heroCreate(hero, reToken);
        if (!resCreateId) return showToast(t('hero.errors.create'), 'danger')
        
        // Завантаження фото
        if ((publicPhotos) && (publicPhotos.length > 0)) {
            const uFiles:File[] = [];
            const reToken  = executeRecaptcha ? await executeRecaptcha('form') : null;
            if (!reToken) return showToast(t('error'), 'danger');
            for(let i = 0; i<publicPhotos.length; i ++ ) {
                const file = publicPhotos[i];
                const _file = (file.type.startsWith('image/')) ? await fileToWebpFile(file) : file; 
                uFiles.push(_file || file);
            }
            const resUpload = await uploadFiles(uFiles, null, `hero/photo/${resCreateId}`, reToken) 
            if (!resUpload) return showToast(t('hero.errors.upload'), 'danger')
        }

        await router.push(`/new/${resCreateId}`);
        
    }

    return {
        handleSubmit
    }

}
