"use client"
import { heroSorterVideos } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { HeroVideoItem } from "@global/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const useHeroVideos = (heroId: number, videos: HeroVideoItem[]) => {
    const t = useTranslations();
    const { showToast } = useToast();
    const [list, setList] = useState(
        videos.map((v) => ({ ...v, id: (v as any).ID }))
    );

    const changeSort = async (sortedIds: number[]) => {
        // Локально оновлюємо порядок елементів.
        // Мережевий запит на збереження сортування можна додати тут у майбутньому.
        const resSort = await heroSorterVideos(heroId, sortedIds);
        if (!resSort) showToast(t('error'),'danger')
    };

    useEffect(() => {
        setList(videos.map((v) => ({ ...v, id: (v as any).ID })));
    }, [videos, heroId]);

    return {
        list,
        setList,
        changeSort,
    };
};

export default useHeroVideos;