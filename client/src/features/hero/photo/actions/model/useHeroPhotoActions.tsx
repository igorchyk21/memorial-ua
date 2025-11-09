"use client"
import { heroDeletePhoto, heroSetStatusPhoto } from "@/entities/hero";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useRouter } from "@bprogress/next";
import { HERO_PHOTO_STAT } from "@global/types"
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
 
export const useHeroPhotoActions = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog,hideDialog } = useModal();
    const [ update, setUpdate ] = useQueryState<string>('update');
    const path = usePathname();
    const router = useRouter();

    const _photoDelete = async (photoId:number) => {
        const resDel = await heroDeletePhoto(photoId);
        if (!resDel) showToast(t('error'), 'danger');
            else showToast(t('hero.messDeletePhoto'), 'success');
        setUpdate(Date.now().toString());
    }
 
    const handleClickStatus = async (photoId:number, newStatus:HERO_PHOTO_STAT) => {
        const resStat = await heroSetStatusPhoto(photoId, newStatus);
        if (!resStat) showToast(t('error'),'danger');
        setUpdate(Date.now().toString());
    }

    const handleClickDelete = async (photoId:number) => {
        showDialog({
            open:true,
            title:t('hero.photo.titleDelete'),
            content:(<h4>{t('hero.photo.confirmDelete')}</h4>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:async()=>await _photoDelete(photoId)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
        })
    } 

    const handleClickSetMain = async (photoId:number) => {
        router.push(`${path}/${photoId}`)
    }

    return {
        handleClickStatus,
        handleClickDelete,
        handleClickSetMain
    }
}