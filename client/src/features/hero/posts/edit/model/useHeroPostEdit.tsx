"use client"
import { useModal } from "@/shared/context/Modal/model/useModal"
import { HERO_POST_STAT, HeroPostType } from "@global/types"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import PostEditForm from "../ui/PostEditForm";
import { PostEditFormikType } from "../type/post.edit.type";
import { useEffect, useRef } from "react";
import { useAuth } from "@/shared/context/Auth";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { heroSavePost, heroSetStatusPost } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { lengthWords } from "@/shared/helper/string/stringHelper";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
  


export const useHeroPostEdit = (heroId:number) => {


    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog, hideDialog } = useModal();
    const { auth } = useAuth();
    const [ update, setUpdate ] = useQueryState<string>('update');
    const { executeRecaptcha } = useGoogleReCaptcha();

    const emptyPost:HeroPostType = {
        ID: 0,
        heroId: heroId,
        userId: auth?.user.ID || 0,
        author: auth?.user.userName || '',
        body:'',
        dt: Date.now(),
        status: HERO_POST_STAT.PENDING, 
    }

    const handleSubmit = async (values:HeroPostType) => {
        const reToken  = executeRecaptcha ? await executeRecaptcha('form') : null;
        const l = lengthWords(values.body);
        if (!((l>=10) && (l<=200))) return showToast(t('hero.post.wordsInfo'),'danger');
        const resSave = await heroSavePost(values.ID, values, reToken);
        if (resSave) showToast(values.ID ? t('hero.messPostSaved') : t('hero.messPostCreated'), 'success') 
            else showToast(t('error'), 'danger')
        setUpdate(Date.now().toString());
        hideDialog();
    }

    const handleClickEdit = (post:HeroPostType|null) => { 
        const p = post ? post : emptyPost;
        if (post?.userName) p.author = post?.userName;
        showDialog({
            open:true,
            title:t(`hero.post.${p.ID?'editPost':'createPost'}`),
            width:900,
            content:(<PostEditForm
                        authorDisabled={Boolean(auth?.user)}
                        post={p}
                        handleCancel={()=>hideDialog()}
                        handleSubmit={handleSubmit}/>),
                        buttons:[]
        }) 
    }

    const handleClickStatus = async (postId:number, newStatus:HERO_POST_STAT) => {
        const resStat = await heroSetStatusPost(postId, newStatus);
        if (!resStat) showToast(t('error'), 'danger');
        setUpdate(Date.now().toString());   
    }

    return {
        handleClickEdit,
        handleClickStatus
    }
}

 