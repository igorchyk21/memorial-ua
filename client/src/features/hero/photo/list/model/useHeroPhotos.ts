import { heroSorterPhotos } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { HeroPhotoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const useHeroPhotos = (heroId:number, photos:HeroPhotoItem[]) => {

    const t = useTranslations();
    const { showToast } = useToast();

    const [list, setList] = useState(
        photos.map(p => ({ ...p, id: p.ID })) // додаємо id для Sortable
    );

    const changeSort = async (sortedIds:number[]) => {
        const resSort = await heroSorterPhotos(heroId, sortedIds);
        if (!resSort) showToast(t('error'),'danger')
    }

    useEffect(()=>{
        setList(photos.map(p => ({ ...p, id: p.ID })) )
    },[photos])

    return {
        list, setList,
        changeSort,

    }
} 

export default useHeroPhotos;