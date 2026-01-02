import { FloatingLabel, FormControl } from "react-bootstrap";
import { useTranslations } from "next-intl";
import { RefObject, useEffect } from "react";

interface Props {
    refInputTextarea: RefObject<HTMLTextAreaElement|null>;
    description: string;
}

const HeroVideEditForm = ({refInputTextarea, description}:Props) => {
    const t = useTranslations();

    useEffect(()=>{
        setTimeout(() => {
            refInputTextarea?.current?.focus();
        }, 0);
    },[]);
    return (
        <div>
            <FloatingLabel controlId="fl-textarea" label={t('hero.video.videoDescription')}> 
                <FormControl as="textarea"
                    rows={10} 
                    maxLength={1000}
                    defaultValue={description}
                    placeholder={t('hero.video.videoDescription')}
                    style={{ height: 250 }}
                    className="form-control" 
                    ref={refInputTextarea}/>                
            </FloatingLabel>
        </div>
    )
}

export default HeroVideEditForm;