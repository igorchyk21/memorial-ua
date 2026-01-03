"use client"

import { HeroCandleDataType } from "@global/types";
import { FormikProps } from "formik";
import { Button, FloatingLabel, FormControl, FormLabel, Stack, ToggleButton } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/context/Auth";
import conf from "@/shared/config/conf";
import { safeIntParse } from "@/shared/helper/safeParsers";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";

interface Props {
    formik: FormikProps<HeroCandleDataType>;
    disabled?: boolean;
}   

const CandleLightForm = ({formik, disabled}:Props) => {

    const { auth } = useAuth();
    const t = useTranslations();

    return (
        <form onSubmit={formik.handleSubmit}>
        {/* Text input */}
        <FloatingLabel controlId="fl-text" label={t('hero.candle.youName')} className="mb-3">
            <FormControl 
                type="text" 
                value={auth?.user.userName||''}
                disabled={!!auth?.user.userName || formik.isSubmitting || disabled}
                onChange={(e) => formik.setFieldValue('userName', e.target.value)}
                placeholder={t('hero.candle.youName')} />
        </FloatingLabel>

        {/* Textarea */}
        <FloatingLabel controlId="fl-textarea" 
            label={t('hero.candle.youMess')}>
            <FormControl as="textarea" 
                maxLength={250}
                placeholder={t('hero.candle.youMess')} 
                style={{ height: 120 }} 
                value={formik.values.comment||''}
                disabled={formik.isSubmitting || disabled}
                onChange={(e) => formik.setFieldValue('comment', e.target.value)} />
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
                disabled={formik.isSubmitting || disabled}
                checked={formik.values.price === value}
                onChange={(e) => {
                    const days = conf.candleDays[index];
                    formik.setFieldValue('price', safeIntParse(e.currentTarget.value))
                    formik.setFieldValue('days', days)
                }}>
                {`${value ? `${value} ${t('uah')} - ${conf.candleDays[index]} ${t('hero.candle.days')}` : t('hero.candle.noPay')}`}
            </ToggleButton>
            ))}
        </Stack>

        <div className="pt-3">
            <Button
                type="submit"
                disabled={formik.isSubmitting || disabled}
                className="d-block w-100">                    
                    <SpinnerTitle showSpinner={formik.isSubmitting || !!disabled} titleButton={t('hero.candle.light')}/>
            </Button>
        </div>

        </form>
    )
}

export default CandleLightForm;