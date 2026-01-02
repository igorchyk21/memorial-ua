"use client"
import { RefObject } from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";
import { useTranslations } from "next-intl";

interface Props {
    refInputTextarea: RefObject<HTMLTextAreaElement|null>;
    description:string;
}

const HeroAudioEditForm = ({refInputTextarea, description}:Props) => {
    const t = useTranslations();
    return (<>
        <FloatingLabel controlId="fl-textarea" label={t('hero.audio.audioDescription')}> 
            <FormControl as="textarea"
                rows={10} 
                maxLength={1000}
                defaultValue={description}
                placeholder={t('hero.audio.audioDescription')}
                style={{ height: 250 }}
                className="form-control" 
                ref={refInputTextarea}/>                
        </FloatingLabel>
    </>)
}

export default HeroAudioEditForm;


