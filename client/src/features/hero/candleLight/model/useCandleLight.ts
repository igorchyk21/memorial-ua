"use client"
import { HeroCandleDataType } from "@global/types";
import { useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; 
import { heroAddCandle } from "@/entities/hero";
import { useTranslations } from "next-intl";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useAuth } from "@/shared/context/Auth/model/useAuth";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { FormikHelpers } from "formik";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { OfferingKind } from "../ui/CandleLightHeader";

const useCandleLight = (heroId:number, offeringType: OfferingKind) => {
    
    const t = useTranslations();
    const { auth, reFetchUser } = useAuth();
    const { showToast } = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [ candleExpiries, setCandleExpiries ] = useState<number|null>(null);
    const [ activeTab, setActiveTab ] = useState<'form' | 'candle' | null>(null);
    const [ wfpHtml, setWfpHtml ] = useState<string|null>(null);
    const wfpContainerRef = useRef<HTMLDivElement|null>(null);
    const [ update, setUpdate ] = useQueryState<string>('update');

    useEffect(() => {
        
        const updateCandleState = () => {
            const dt = Date.now();
            if (auth?.isLogin) {
                const active = auth?.user?.candles?.find(
                    c => c.heroId === heroId && c.expiries > dt && Boolean(c.flower) === (offeringType === "flower")
                )?.expiries || null;
                setCandleExpiries(prev => (prev !== active ? active : prev));
                setActiveTab(prev => (active ? 'candle' : 'form'));
            } else {
                const storageKey = `candle_${heroId}_${offeringType}`;
                const candleExpiries = safeIntParse(sessionStorage.getItem(storageKey));
                setCandleExpiries(candleExpiries>=dt ? Number(candleExpiries) : null);
                setActiveTab(candleExpiries>=dt ? 'candle' : 'form');
            }
        };
    
        updateCandleState(); // одразу при монтуванні
    
        const interval = setInterval(updateCandleState,  60*1000);
        return () => clearInterval(interval);
    }, [auth?.user?.candles, heroId, offeringType]);
    

    const handleSubmit = async (values: HeroCandleDataType, formik: FormikHelpers<HeroCandleDataType>) => {
        const candleData: HeroCandleDataType = {
            ...values,
            flower: offeringType === "flower",
            userId: auth?.user.ID||0,
            userName: auth?.user.userName||values.userName||'',
        };
        const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
        const resAddCandle = await heroAddCandle(heroId, candleData, window.location.href, reToken);
        
        if (resAddCandle?.wfp) {
            setWfpHtml(resAddCandle.wfp);
            return;
        }

        if (resAddCandle) {
            formik.resetForm();
            if (auth?.isLogin) 
                await reFetchUser();
            else {
                const storageKey = `candle_${heroId}_${offeringType}`;
                sessionStorage.setItem(storageKey, resAddCandle?.expiries?.toString()||'');
                setCandleExpiries(resAddCandle?.expiries||null);
            }
            setActiveTab('candle');
            setUpdate(Date.now().toString()); 

        }

        else return showToast(t('error'), 'danger');
    } 


    
    useEffect(() => {
        if (!wfpHtml) return;
        if (!wfpContainerRef.current) return;

        // Вставляємо HTML форми в DOM
        wfpContainerRef.current.innerHTML = wfpHtml;

        // Знаходимо форму та відправляємо її
        const form =
            document.getElementById("autoSubmitForm") as HTMLFormElement | null ||
            (wfpContainerRef.current.querySelector("form") as HTMLFormElement | null);
        if (form) form.submit();
        
    }, [wfpHtml]);

    return {
        handleSubmit,
        activeTab,
        setActiveTab,
        candleExpiries,
        wfpHtml,
        wfpContainerRef,
    }
}

export default useCandleLight;