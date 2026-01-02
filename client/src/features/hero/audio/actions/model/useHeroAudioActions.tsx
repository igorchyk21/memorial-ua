"use client"
import { heroDeleteAudio, heroEditAudio, heroSetStatusAudio } from "@/entities/hero/model/heroModel";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { HERO_VIDEO_STAT } from "@global/types"
import { useTranslations } from "next-intl";
import { useRef } from "react";
import HeroAudioEditForm from "../ui/HeroAudioEditForm";
 
export const useHeroAudioActions = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog,hideDialog } = useModal();
    const [ , setUpdate ] = useQueryState<string>('update');
    const refInputTextarea = useRef<HTMLTextAreaElement|null>(null);

    const _audioDelete = async (audioId:number) => {
        const resDel = await heroDeleteAudio(audioId);
        if (!resDel) showToast(t('error'), 'danger');
            else showToast(t('hero.messDeleteAudio'), 'success');
        setUpdate(Date.now().toString());
    }

    const _audioEdit = async (audioId:number) => {
        const resEdit = await heroEditAudio(audioId, refInputTextarea.current?.value||'');
        if (!resEdit) showToast(t('error'), 'danger');
            else showToast(t('hero.messEditAudio'), 'success'); 
        setUpdate(Date.now().toString());
    }
 
    const handleClickStatus = async (audioId:number, newStatus:HERO_VIDEO_STAT) => {
        const resStat = await heroSetStatusAudio(audioId, newStatus);
        if (!resStat) showToast(t('error'),'danger');
        setUpdate(Date.now().toString());
    }

    const handleClickDelete = async (audioId:number) => {
        showDialog({
            open:true,
            title:t('hero.audio.titleDelete'),
            content:(<h4>{t('hero.audio.confirmDelete')}</h4>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:async()=>await _audioDelete(audioId)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
        })
    } 

    const handleClickEdit = async (audioId:number, description:string) => {
        showDialog({
            open:true,
            title:t('hero.audio.edit'),
            content:(<HeroAudioEditForm refInputTextarea={refInputTextarea} description={description}/>),
            buttons:[
                {title:t('buttons.save'), buttonProps:{variant:'primary'}, onClick:async()=>await _audioEdit(audioId)},
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


