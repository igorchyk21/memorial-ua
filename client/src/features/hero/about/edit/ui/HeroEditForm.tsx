"use client"
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { HeroShortType } from "@global/types";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { Button, Col, FloatingLabel, FormControl, FormLabel, Row } from "react-bootstrap";
import DatePicker, { registerLocale } from 'react-datepicker';
import { DateTime as DT } from "luxon";
import ReactQuillSimple from "@/shared/ui/editors/ReactQuill";
import { useEffect, useRef } from "react";
import { uk }  from "date-fns/locale/uk";

interface Props { 
    hero:HeroShortType;
    handleSubmit:(values:HeroShortType)=>void;
    handleCancel:()=>void;
    darkTheme?:boolean;
}
 
const HeroEditForm = ({hero, handleSubmit, handleCancel, darkTheme}:Props) => {

    const refInputLName = useRef<HTMLInputElement>(null);
    const t = useTranslations();
    registerLocale("uk", uk);

    useEffect(()=>{
        setTimeout(() => {
            refInputLName.current?.focus();
        }, 0);
    },[])
 
    return (
        <Formik<HeroShortType>
            initialValues={hero}
            onSubmit={handleSubmit}>

            {(formik)=>(
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        {/** Прізвище Герояя */}
                        <Col md={4}>
                            <FloatingLabel controlId="fl-text" label={t('hero.about.lname')} className="mb-3">
                            <FormControl type="text" 
                                ref={refInputLName}
                                autoFocus
                                placeholder={t('hero.about.lname')}
                                value={formik.values.lName}
                                onChange={(e)=>formik.setFieldValue('lName', e.target.value)}
                                disabled={formik.isSubmitting} />
                            </FloatingLabel>
                        </Col>

                        {/** Імя Герояя */}
                        <Col md={4}>
                            <FloatingLabel controlId="fl-text" label={t('hero.about.fname')} className="mb-3">
                            <FormControl type="text" 
                                autoFocus
                                placeholder={t('hero.about.fname')}
                                value={formik.values.fName}
                                onChange={(e)=>formik.setFieldValue('fName', e.target.value)} 
                                disabled={formik.isSubmitting}/>
                            </FloatingLabel>
                        </Col>

                        {/** По-батькові Герояя */}
                        <Col md={4}>
                            <FloatingLabel controlId="fl-text" label={t('hero.about.mname')} className="mb-3">
                            <FormControl type="text" 
                                autoFocus
                                placeholder={t('hero.about.mname')}
                                value={formik.values.mName}
                                onChange={(e)=>formik.setFieldValue('mName', e.target.value)} 
                                disabled={formik.isSubmitting}/>
                            </FloatingLabel>
                        </Col>

                        {/** Дата народження */}
                        <Col md={4}>
                            <FormLabel htmlFor="clearableInput">{t('hero.about.dtBirth')}</FormLabel>
                            <div className="position-relative mb-2">
                                <i className="ci-calendar position-absolute top-50 start-0 translate-middle-y z-1 ms-3"/>
                                <DatePicker
                                    locale="uk"
                                    selected={DT.fromMillis(formik.values.birth||0).toJSDate()}
                                    onChange={(date) => formik.setFieldValue('birth', date ? DT.fromJSDate(date).toMillis() : 0)}
                                    isClearable
                                    dateFormat="dd.MM.yyyy" 
                                    className="form-control form-icon-start"
                                    id="clearableInput"
                                    placeholderText={t('hero.about.dtBirth')}
                                    popperPlacement="bottom-start"
                                    disabled={formik.isSubmitting}/>
                            </div>
                        </Col>

                        {/** Дата мобілізації */}
                        <Col md={4}>
                            <FormLabel htmlFor="clearableInput">{t('hero.about.dtMobilization')}</FormLabel>
                            <div className="position-relative mb-2">
                                <i className="ci-calendar position-absolute top-50 start-0 translate-middle-y z-1 ms-3"/>
                                <DatePicker
                                    locale="uk"
                                    selected={DT.fromMillis(formik.values.mobilization||0).toJSDate()}
                                    onChange={(date) => formik.setFieldValue('mobilization', date ? DT.fromJSDate(date).toMillis() : 0)}
                                    isClearable
                                    dateFormat="dd.MM.yyyy" 
                                    className="form-control form-icon-start"
                                    id="clearableInput"
                                    placeholderText={t('hero.about.dtMobilization')}
                                    popperPlacement="bottom-start"
                                    disabled={formik.isSubmitting}/>
                            </div>
                        </Col>

                        {/** Дата смерті */}
                        <Col md={4}>
                            <FormLabel htmlFor="clearableInput">{t('hero.about.dtDeath')}</FormLabel>
                            <div className="position-relative mb-2">
                                <i className="ci-calendar position-absolute top-50 start-0 translate-middle-y z-1 ms-3"/>
                                <DatePicker
                                    locale="uk"
                                    selected={DT.fromMillis(formik.values.death||0).toJSDate()}
                                    onChange={(date) => formik.setFieldValue('death', date ? DT.fromJSDate(date).toMillis() : 0)}
                                    isClearable
                                    dateFormat="dd.MM.yyyy" 
                                    className="form-control form-icon-start"
                                    id="clearableInput"
                                    placeholderText={t('hero.about.dtDeath')}
                                    popperPlacement="bottom-start"
                                    disabled={formik.isSubmitting}/>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-2">

                        {/** Місце служби-рота */}
                        <Col md={8}>
                            <FloatingLabel controlId="fl-text" label={t('hero.about.armyNameLabel')} className="mb-3">
                            <FormControl type="text" 
                                autoFocus
                                placeholder={t('hero.about.armyNameLabel')}
                                value={formik.values.armyName||''}
                                onChange={(e)=>formik.setFieldValue('armyName', e.target.value)} 
                                disabled={formik.isSubmitting}/>
                            </FloatingLabel>
                        </Col>

                        {/** Позивний */}
                        <Col md={4}>
                            <FloatingLabel controlId="fl-text" label={t('hero.about.callSign')} className="mb-3">
                            <FormControl type="text" 
                                autoFocus
                                placeholder={t('hero.about.callSign')}
                                value={formik.values.callSign}
                                onChange={(e)=>formik.setFieldValue('callSign', e.target.value)} 
                                disabled={formik.isSubmitting}/>
                            </FloatingLabel>
                        </Col>                        
                    </Row>

                    {/** Про Героя */}
                    <FormLabel htmlFor="clearableInput">{t('hero.about.title')}</FormLabel>
                    <div>
                        <ReactQuillSimple
                            stickyMode
                            darkTheme={darkTheme}
                            value={formik.values.about||''}
                            onChange={(value)=>formik.setFieldValue('about',value)}
                            disabled={formik.isSubmitting}/>
                    </div>

                    <div className="d-flex justify-content-end pt-4 pe-2" style={{position:'sticky', bottom:0}}>
                        <Button 
                            type="submit"
                            variant="primary"
                            className="me-1"
                            disabled={formik.isSubmitting}>
                            <SpinnerTitle showSpinner={formik.isSubmitting} titleButton={t(`buttons.save`)}/>
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

export default HeroEditForm;