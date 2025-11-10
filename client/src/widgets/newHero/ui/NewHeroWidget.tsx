"use client"
import { HeroPublicPhone } from "@/entities/hero";
import { HeroEditForm, useHeroNew } from "@/features/hero";
import { useAuth } from "@/shared/context/Auth";
import { normalizeSpaces } from "@/shared/helper/string/stringHelper";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import ImageUploadDropzone from "@/shared/ui/forms/ImageUploadDropzone";
import StartWidthField from "@/shared/ui/forms/StartWidthField";
import { useRouter } from "@bprogress/next";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Col, FormLabel, Row } from "react-bootstrap";

const NewHeroWidget = () => {

    const router = useRouter();
    const t = useTranslations();
    const { handleSubmit } = useHeroNew();
    const { auth } = useAuth();
    const [ heroName, setHeroName ] = useQueryState<string>('hero');
    const [ fName, lName ] = normalizeSpaces(heroName||'').split(' ');
    
    return (<> 
        <HeroEditForm 
            handleCancel={()=>router.push('/')}
            handleSubmit={handleSubmit}
            hero={{
                ID:0,
                fName:fName||'',
                lName:lName||'',
                mName:'',
                birth:0,
                death:0,
                mobilization:0,
                armyName:'',
                status:0,
                url:''
            }}
            
            additionalFields={
                <Row>
                    {!auth?.user.admin &&
                    (<Col xs={12} className="mb-3">
                        <HeroPublicPhone/>
                    </Col>)}
                    <Col className="mb-3">
                    <ImageUploadDropzone
                        name="publicPhotos"
                        title={t('hero.about.photos')}/>
                    </Col>
                </Row>}/>
    </>)
}
 
export default NewHeroWidget;