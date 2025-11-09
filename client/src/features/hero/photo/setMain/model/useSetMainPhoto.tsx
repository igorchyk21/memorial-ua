import { heroSetMainPhoto } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useRouter } from "@bprogress/next";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

const useSetMainPhoto = (heroId:number) => {

    const t = useTranslations();
    const { showToast } = useToast();
    const path = usePathname();
    const router = useRouter();
    const [ isUpload, setIsUpload ] = useState<boolean>(false);

    const aPath = path.split('/');
    
    const handleCrop = async (base64:string): Promise<boolean>=> {
        setIsUpload(true);
        const resChange = await heroSetMainPhoto(heroId, base64);
        if (resChange) {
            router.push(`/hero/${aPath[2]}`);
        }
            else showToast(t('error'), 'danger');
        
        setIsUpload(false);
        return resChange;
        
    } 

    return {
        handleCrop,
        isUpload
    }
}

export default useSetMainPhoto;