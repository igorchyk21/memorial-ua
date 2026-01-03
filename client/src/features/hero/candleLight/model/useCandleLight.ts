"use client"
import { HeroCandleDataType } from "@global/types";
import { useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; 
import { heroAddCandle } from "@/entities/hero";
import { useTranslations } from "next-intl";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useAuth } from "@/shared/context/Auth/model/useAuth";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { FormikHelpers, FormikProps } from "formik";

const useCandleLight = (heroId:number) => {
    
    const t = useTranslations();
    const { auth, reFetchUser } = useAuth();
    const { showToast } = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [ candleExpiries, setCandleExpiries ] = useState<number|null>(null);
    const [ activeTab, setActiveTab ] = useState<'form' | 'candle' | null>(null);
    const [ wfpHtml, setWfpHtml ] = useState<string|null>(null);
    const wfpContainerRef = useRef<HTMLDivElement|null>(null);


    useEffect(() => {
        
        const updateCandleState = () => {
            const dt = Date.now();
            if (auth?.isLogin) {
                const active = auth?.user?.candles?.find(
                    c => c.heroId === heroId && c.expiries > dt
                )?.expiries || null;
                setCandleExpiries(prev => (prev !== active ? active : prev));
                setActiveTab(prev => (active ? 'candle' : 'form'));
            } else {
                const candleExpiries = safeIntParse(sessionStorage.getItem(`candle_${heroId}`));
                setCandleExpiries(candleExpiries>=dt ? Number(candleExpiries) : null);
                setActiveTab(candleExpiries>=dt ? 'candle' : 'form');
            }
        };
    
        updateCandleState(); // одразу при монтуванні
    
        const interval = setInterval(updateCandleState,  60*1000);
        return () => clearInterval(interval);
    }, [auth?.user?.candles, heroId]);
    

    const handleSubmit = async (values: HeroCandleDataType, formik: FormikHelpers<HeroCandleDataType>) => {
        const reToken = executeRecaptcha ? await executeRecaptcha('form') : null;
        const resAddCandle = await heroAddCandle(heroId, {...values, userId: auth?.user.ID||0, userName: auth?.user.userName||values.userName||''}, window.location.href, reToken);
        
        if (resAddCandle?.wfp) {
            setWfpHtml(resAddCandle.wfp);
            return;
        }

        if (resAddCandle) {
            formik.resetForm();
            if (auth?.isLogin) 
                await reFetchUser();
            else {
                console.log(resAddCandle?.expiries);
                sessionStorage.setItem(`candle_${heroId}`, resAddCandle?.expiries?.toString()||'');
                setCandleExpiries(resAddCandle?.expiries||null);
            }
            setActiveTab('candle');
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