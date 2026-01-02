"use client"
import { heroDeleteVideo, heroEditVideo, heroSetStatusPhoto, heroSetStatusVideo } from "@/entities/hero";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useRouter } from "@bprogress/next";
import { HERO_PHOTO_STAT, HERO_VIDEO_STAT } from "@global/types"
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import HeroVideEditForm from "../ui/HeroVideEditForm";
import { useRef } from "react";
 
export const useHeroVideActions = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog,hideDialog } = useModal();
    const [ update, setUpdate ] = useQueryState<string>('update');
    const refInputTextarea = useRef<HTMLTextAreaElement|null>(null);
    const path = usePathname();
    const router = useRouter();

    const _videoDelete = async (videoId:number) => {
        const resDel = await heroDeleteVideo(videoId);
        if (!resDel) showToast(t('error'), 'danger');
            else showToast(t('hero.messDeleteVideo'), 'success');
        setUpdate(Date.now().toString());
    }

    const _videoEdit = async (videoId:number) => {
        const resEdit = await heroEditVideo(videoId, refInputTextarea.current?.value||'');
        if (!resEdit) showToast(t('error'), 'danger');
            else showToast(t('hero.messEditVideo'), 'success'); 
        setUpdate(Date.now().toString());
    }
 
    const handleClickStatus = async (videoId:number, newStatus:HERO_VIDEO_STAT) => {
        const resStat = await heroSetStatusVideo(videoId, newStatus);
        if (!resStat) showToast(t('error'),'danger');
        setUpdate(Date.now().toString());
    }

    const handleClickDelete = async (videoId:number) => {
        showDialog({
            open:true,
            title:t('hero.video.titleDelete'),
            content:(<h4>{t('hero.video.confirmDelete')}</h4>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:async()=>await _videoDelete(videoId)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
        })
    } 

    const handleClickEdit = async (videoId:number, description:string) => {
        showDialog({
            open:true,
            title:t('hero.video.edit'),
            content:(<HeroVideEditForm refInputTextarea={refInputTextarea} description={description}/>),
            buttons:[
                {title:t('buttons.save'), buttonProps:{variant:'primary'}, onClick:async()=>await _videoEdit(videoId)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
    })
    }

    return {
        handleClickStatus,
        handleClickDelete,
        handleClickEdit,
    }
}