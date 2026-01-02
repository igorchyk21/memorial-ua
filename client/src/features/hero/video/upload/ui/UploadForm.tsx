import { RefObject, useEffect, useState } from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";
import { useTranslations } from "next-intl";
import StartWidthField from "@/shared/ui/forms/StartWidthField";
import StartWidthInput from "@/shared/ui/forms/StartWidthInput";

interface Props {
    refInputTextarea?: RefObject<HTMLTextAreaElement|null>;
    refInputYoutubeLink?: RefObject<HTMLInputElement|null>;
    uploadFileName?:string;
    uploadMode?:'video'|'youtube';
}

const UploadForm = ({refInputTextarea, refInputYoutubeLink, uploadFileName, uploadMode='video'}:Props) => {

    const [youtubeLink, setYoutubeLink] = useState('');
    const t = useTranslations();
    useEffect(()=>{
        setTimeout(() => {
            if (refInputYoutubeLink?.current)
                refInputYoutubeLink?.current.focus();
            else
                if (refInputTextarea?.current)
                    refInputTextarea?.current.focus();
        }, 0);
    },[]);

    return (
        <div className="d-flex flex-column gap-3">

            {uploadMode==='video'
            ?(<FloatingLabel controlId="fl-text" label={t('hero.video.videoFileName')}>
                <FormControl type="text"
                    className="form-control"
                    value={uploadFileName}
                    placeholder={t('hero.video.videoFileName')}
                    disabled/>
            </FloatingLabel>)
            :(<FloatingLabel controlId="fl-text" label={t('hero.video.videoYoutubeLink')}>
                <StartWidthInput
                    id="youtubeLink"
                    name="youtubeLink"
                    startWith="https://"
                    onlyNumber={false}
                    refInput={refInputYoutubeLink}
                    value={youtubeLink}
                    onChange={(value)=>setYoutubeLink(value)}/> 
            </FloatingLabel>)}

            <FloatingLabel controlId="fl-textarea" label={t('hero.video.videoDescription')}> 
                <FormControl as="textarea"
                    rows={10} 
                    maxLength={1000}
                    
                    placeholder={t('hero.video.videoDescription')}
                    style={{ height: 250 }}
                    className="form-control" 
                    ref={refInputTextarea}/>                
            </FloatingLabel>

            
        </div>
    )
}

export default UploadForm;