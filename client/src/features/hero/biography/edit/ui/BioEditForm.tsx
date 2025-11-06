"use client"
import { Formik } from "formik";
import { m } from "framer-motion";
import { useTranslations } from "next-intl"
import { Button, Col, FloatingLabel, FormControl, FormLabel, Row } from "react-bootstrap"
import { Ref, useEffect, useRef } from "react";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { HeroBiographyItem, HeroPostType } from "@global/types";
import { lengthWords } from "@/shared/helper/string/stringHelper";
import DatePicker, { registerLocale } from "react-datepicker";
import { DateTime as DT } from "luxon";
import { uk }  from "date-fns/locale/uk";


interface Props{
    handleSubmit:(values:HeroBiographyItem)=>void;
    handleCancel:()=>void;
    item:HeroBiographyItem;
}

const BioEditForm = ({handleSubmit, handleCancel, item}:Props) => {
    registerLocale("uk", uk);
    
    const t = useTranslations();
    const refTitle = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        setTimeout(() => {
            refTitle.current?.focus();
        }, 0);
    },[])
     

    return ( 
        <Formik<HeroBiographyItem> 
            initialValues={item}
            onSubmit={handleSubmit}>
 
            {(formik)=>(
                <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>

                    <Row className="mb-3">
                        <Col md={8} className="_bg-danger d-flex align-items-end">
                            <FloatingLabel 
                                className="w-100"
                                controlId="fl-text" 
                                label={t('hero.biography.title')} >
                                <FormControl type="text" 
                                    className="w-100"
                                    autoFocus
                                    ref={refTitle}
                                    required
                                    minLength={5}
                                    maxLength={100}
                                    disabled={formik.isSubmitting}
                                    placeholder={t('hero.biography.title')}
                                    value={formik.values.title||''}
                                    onChange={(e)=>formik.setFieldValue('title', e.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FormLabel htmlFor="clearableInput">{t('hero.biography.date')}</FormLabel>
                            <div className="position-relative">
                                <i className="ci-calendar position-absolute top-50 start-0 translate-middle-y z-1 ms-3"/>
                                <DatePicker
                                    locale="uk"
                                    selected={DT.fromMillis(formik.values.dt||0).toJSDate()}
                                    onChange={(date) => formik.setFieldValue('dt', date ? DT.fromJSDate(date).toMillis() : 0)}
                                    isClearable
                                    dateFormat="dd.MM.yyyy" 
                                    className="form-control form-icon-start mb-0"
                                    id="clearableInput"
                                    placeholderText={t('hero.biography.date')}
                                    popperPlacement="bottom-start"
                                    disabled={formik.isSubmitting}/>
                            </div>
                        </Col>
                    </Row>
                    

                     
                    <FloatingLabel controlId="fl-textarea"  
                        label={t('hero.biography.body')}>
                        <FormControl 
                            as="textarea" 
                            placeholder={t('hero.biography.body')} 
                            style={{ height: 250 }}
                            value={formik.values.body||''}
                            disabled={formik.isSubmitting}
                            maxLength={2500}
                            onChange={(e)=>formik.setFieldValue('body', e.target.value)} />
                    </FloatingLabel>        
                    

                    <div className="d-flex justify-content-end pt-4" >
                        <Button 
                            type="submit"
                            variant="primary"
                            className="me-1"
                            disabled={formik.isSubmitting}>
                            <SpinnerTitle showSpinner={formik.isSubmitting} titleButton={t(`buttons.${item.ID?'save':'send'}`)}/>
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

export default BioEditForm;