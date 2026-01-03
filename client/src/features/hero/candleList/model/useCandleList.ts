import { heroGetCandles } from "@/entities/hero/model/heroModel";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { HeroCandleType } from "@global/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const useCandleList = (heroId:number) => {

    const t = useTranslations();
    const { showToast } = useToast();

    const [candles, setCandles] = useState<HeroCandleType[]|null>(null);           


    useEffect(()=>{
        const fetchCandles = async () => {
            const candles = await heroGetCandles(heroId);
            if (!candles) {
                setCandles([])
                return showToast(t('error'),'danger');
            }
            setCandles(candles||[]);
        }
        fetchCandles();
    },[heroId]);

    return {
        candles,
    }
}

export default useCandleList;