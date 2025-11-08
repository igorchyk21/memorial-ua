import { heroSorterPhotos } from "@/entities/hero";
import { HeroPhotoItem } from "@global/types";
import { useState } from "react";

const useHeroPhotos = (heroId:number, photos:HeroPhotoItem[]) => {

    const [list, setList] = useState(
        photos.map(p => ({ ...p, id: p.ID })) // додаємо id для Sortable
    );

    const changeSort = async (sortedIds:number[]) => {
        const resSort = heroSorterPhotos(heroId, sortedIds);
    }

    return {
        list, setList,
        changeSort,

    }
} 

export default useHeroPhotos;