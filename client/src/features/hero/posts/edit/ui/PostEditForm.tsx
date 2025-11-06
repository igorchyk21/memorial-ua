"use client"
import { Formik } from "formik";
import { m } from "framer-motion";
import { useTranslations } from "next-intl"
import { Button, FloatingLabel, FormControl, FormLabel } from "react-bootstrap"
import { PostEditFormikType } from "../type/post.edit.type";
import { Ref, useEffect, useRef } from "react";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { HeroPostType } from "@global/types";
import { lengthWords } from "@/shared/helper/string/stringHelper";


interface Props{
    authorDisabled?:boolean;
    handleSubmit:(values:HeroPostType)=>void;
    handleCancel:()=>void;
    refAuthor?:Ref<HTMLInputElement>;
    refBody?:Ref<HTMLTextAreaElement>;
    post:HeroPostType;
}

const PostEditForm = ({handleSubmit, handleCancel, authorDisabled, post}:Props) => {
    
    const t = useTranslations();
    const refAuthor = useRef<HTMLInputElement>(null);
    const refBody = useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        setTimeout(() => {
            authorDisabled ? refBody.current?.focus() : refAuthor.current?.focus();    
        }, 0);
        
    },[])

    return ( 
        <Formik<HeroPostType> 
            initialValues={post}
            onSubmit={handleSubmit}>
 
            {(formik)=>(
                <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
                    <FloatingLabel controlId="fl-text" label={t('hero.post.youName')} className="mb-3">
                        <FormControl type="text" 
                            autoFocus
                            ref={refAuthor}
                            required={!authorDisabled}
                            disabled={formik.isSubmitting || authorDisabled}
                            placeholder={t('hero.post.youName')}
                            value={formik.values.author||''}
                            onChange={(e)=>formik.setFieldValue('author', authorDisabled ? formik.values.author : e.target.value)} />
                    </FloatingLabel>

                    <div className="d-flex justify-content-between">
                    <FormLabel className="pe-3">{t('hero.post.wordsInfo')}</FormLabel>
                    <FormLabel><span className="text-muted pe-1">{t('hero.post.words')}:</span>{lengthWords(formik.values.body)}</FormLabel>
                    </div>
                    <FloatingLabel controlId="fl-textarea"  
                        label={t('hero.post.youPost')}>
                        <FormControl 
                            ref={refBody}
                            autoFocus
                            as="textarea" 
                            required 
                            placeholder={t('hero.post.youPost')} 
                            style={{ height: 250 }}
                            value={formik.values.body}
                            disabled={formik.isSubmitting}
                            onChange={(e)=>formik.setFieldValue('body', e.target.value)} />
                    </FloatingLabel>        
                    

                    <div className="d-flex justify-content-end pt-4" >
                        <Button 
                            type="submit"
                            variant="primary"
                            className="me-1"
                            disabled={formik.isSubmitting}>
                            <SpinnerTitle showSpinner={formik.isSubmitting} titleButton={t(`buttons.${post.ID?'save':'send'}`)}/>
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={handleCancel}
                            disabled={formik.isSubmitting}>{t('buttons.cancel')}</Button>
                    </div>
                </form>
            )}
            
        </Formik>
    )
}

export default PostEditForm;