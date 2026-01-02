import { RefObject, useEffect, useState } from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";
import { useTranslations } from "next-intl";

interface Props {
    refInputTextarea?: RefObject<HTMLTextAreaElement|null>;
    refInputLink?: RefObject<HTMLInputElement|null>;
    uploadFileName?:string;
    uploadMode?:'file'|'link';
}

const UploadAudioForm = ({refInputTextarea, refInputLink, uploadFileName, uploadMode='link'}:Props) => {

    const [audioLink, setAudioLink] = useState('');
    const t = useTranslations();
    useEffect(()=>{
        setTimeout(() => {
            if (uploadMode === 'link') {
                if (refInputLink?.current)
                    refInputLink?.current.focus();
                else
                    if (refInputTextarea?.current)
                        refInputTextarea?.current.focus();
            } else {
                if (refInputTextarea?.current)
                    refInputTextarea?.current.focus();
            }
        }, 0);
    },[uploadMode, refInputLink, refInputTextarea]);

    return (
        <div className="d-flex flex-column gap-3">

            {uploadMode === 'file'
            ?(<FloatingLabel controlId="fl-text" label={t('hero.audio.audioFileName')}>
                <FormControl type="text"
                    className="form-control"
                    value={uploadFileName}
                    placeholder={t('hero.audio.audioFileName')}
                    disabled/>
            </FloatingLabel>)
            :(<FloatingLabel controlId="fl-text" label={t('hero.audio.audioLink')}>
                <FormControl type="text"
                    className="form-control"
                    value={audioLink}
                    placeholder={t('hero.audio.audioLink')}
                    ref={refInputLink}
                    onChange={(e)=>setAudioLink(e.target.value)}/>
            </FloatingLabel>)}

            <FloatingLabel controlId="fl-textarea" label={t('hero.audio.audioDescription')}> 
                <FormControl as="textarea"
                    rows={10} 
                    maxLength={1000}
                    placeholder={t('hero.audio.audioDescription')}
                    style={{ height: 250 }}
                    className="form-control" 
                    ref={refInputTextarea}/>                
            </FloatingLabel>

            
        </div>
    )
}

export default UploadAudioForm;



