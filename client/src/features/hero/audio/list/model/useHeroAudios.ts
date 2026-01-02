"use client"
import { heroSorterAudios } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { HeroVideoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const useHeroAudios = (heroId: number, audios: HeroVideoItem[]) => {
    const t = useTranslations();
    const { showToast } = useToast();
    const [list, setList] = useState(
        audios.map((v) => ({ ...v, id: (v as any).ID }))
    );

    const changeSort = async (sortedIds: number[]) => {
        const resSort = await heroSorterAudios(heroId, sortedIds);
        if (!resSort) showToast(t('error'),'danger')
    };

    useEffect(() => {
        setList(audios.map((v) => ({ ...v, id: (v as any).ID })));
    }, [audios, heroId]);

    return {
        list,
        setList,
        changeSort,
    };
};

export default useHeroAudios;


