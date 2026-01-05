"use client"
import conf from "@/shared/config/conf";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, FormControl, FormLabel, Spinner, Stack, TabPane, Tabs, ToggleButton } from "react-bootstrap";
import { useAuth } from "@/shared/context/Auth/model/useAuth";
import { Formik } from "formik";
import { HeroCandleDataType } from "@global/types";
import CandleLightForm from "./CandleLightForm";
import useCandleLight from "../model/useCandleLight";
import BlockSpinner from "@/shared/ui/spinners/BlockSpinner";
import BaseSpinner from "@/shared/ui/spinners/BaseSpinner";
import { DateTime as DT } from "luxon";
import { CandleShow } from "@/entities/hero";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";

interface Props {
    heroId:number;
    heroName:string;
} 
const CandleLight = ({heroId, heroName}:Props) => {

    const t = useTranslations();
    const { auth } = useAuth();
    const [modelValue, setModelValue] = useState(0);
    const { setHeroCandlesListShow } = useGlobal();
    const { handleSubmit, activeTab, setActiveTab, candleExpiries, wfpHtml, wfpContainerRef } = useCandleLight(heroId);

 
    return (
        <div className="border rounded-4 py-4 px-4 mb-4"
            style={{position:'sticky', top:190}}>
        <div className="mb-3">
        <h5 className="mb-0">{activeTab === 'candle' ? t('hero.candle.candleBurning') : t('hero.candle.title')}</h5>
        {activeTab === 'candle' && <p>{t('hero.candle.candleExpiries')} {DT.fromMillis(candleExpiries||0).setLocale("uk").toLocaleString(DT.DATETIME_MED)}</p>}
        </div>
        
        {wfpHtml && (
            <div ref={wfpContainerRef} className="w-100 d-block" />
        )}

        {activeTab !== null

        ?(<Tabs activeKey={activeTab} 
            className="d-none"
            onSelect={(key) => setActiveTab(key as 'form' | 'candle')}>
        
        <TabPane
            eventKey="form"
            title="form">
            <Formik<HeroCandleDataType>
                initialValues={{
                    userId: auth?.user.ID||0,
                    userName: auth?.user.userName||'',
                    days: 1,
                    price: 0,
                    comment: ''
                }}
                onSubmit={handleSubmit}
            >
                {(formik)=>(
                    <CandleLightForm 
                        disabled={!!wfpHtml}
                        formik={formik} />)}
                </Formik>
            </TabPane>

        <TabPane
            className="py-4"
            eventKey="candle"
            title="candle">
                <CandleShow 
                    maxWidth={200}
                    onClick={()=>setHeroCandlesListShow({id:heroId, name:heroName})} />
        </TabPane>
        </Tabs>)

        :(<BaseSpinner show={true}/>)}


    </div>)
}

export default CandleLight;