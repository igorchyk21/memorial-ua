"use client"
import StartWidthField from "@/shared/ui/forms/StartWidthField"
import { useTranslations } from "next-intl"
import { Col, FormLabel } from "react-bootstrap"

const HeroPublicPhone = () => {
    const t = useTranslations();
    return (<>
        
        <FormLabel className="fw-bold">{t('hero.about.publicPhone')}</FormLabel>
        <StartWidthField  
            name="publicPhone"
            startWith="+380"
            minLength={13}
            maxLength={13}
            required/>
    </>)
}

export default HeroPublicPhone;