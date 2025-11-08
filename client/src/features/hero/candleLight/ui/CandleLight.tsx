"use client"
import conf from "@/shared/config/conf";
import { safeIntParse } from "@/shared/helper/safeParsers";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, FloatingLabel, FormControl, FormLabel, Stack, ToggleButton } from "react-bootstrap";

interface Props {
    heroId:number;
}
const CandleLight = ({heroId}:Props) => {

    const t = useTranslations();
    const [modelValue, setModelValue] = useState(100)

    return (
        <div className="border rounded-4 py-4 px-4 mb-4"
            style={{position:'sticky', top:190}}>
        <h5>{t('hero.candle.title')}</h5>
 
        {/* Text input */}
        <FloatingLabel controlId="fl-text" label={t('hero.candle.youName')} className="mb-3">
            <FormControl type="text" placeholder={t('hero.candle.youName')} />
        </FloatingLabel>

        {/* Textarea */}
        <FloatingLabel controlId="fl-textarea" 
            label={t('hero.candle.youMess')}>
            <FormControl as="textarea" placeholder={t('hero.candle.youMess')} style={{ height: 120 }} />
        </FloatingLabel>

        {/* Model options made of <ToggleButton> */}
        <FormLabel className="pb-1 mt-3 mb-2">{t('hero.candle.offering')}</FormLabel>
        <Stack direction="horizontal" gap={2} className="flex-wrap">
            {conf.candlePrice.map((value, index) => (
            <ToggleButton
                key={index}
                type="radio"
                id={`model-${index}`}
                variant="outline-secondary"
                size="sm"
                name="model-options"
                value={value}
                checked={modelValue === value}
                onChange={(e) => setModelValue(safeIntParse(e.currentTarget.value))}
                
            >
                {value}
            </ToggleButton>
            ))}
        </Stack>

        <div className="pt-3">
            <Button className="d-block w-100">{t('hero.candle.light')}</Button>
        </div>


    </div>)
}

export default CandleLight;