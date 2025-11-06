"use client"
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap"

interface Props {
    onClickEdit:()=>void;
    onClickDelete:()=>void;
    delDisabled?:boolean;
} 

const HeroBioDropdown = ({onClickEdit,onClickDelete,delDisabled}:Props) => {
    const t = useTranslations();
    
    return ( 
        <Dropdown>
            <Dropdown.Toggle as={Button}
                className={`btn-icon border-0 animate-slide-end  rounded-pill`}
                variant="secondary"
                size="sm">
                    <i className="_ci-settings ci-more-horizontal animate-target fs-sm" style={{width:14}} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onClickEdit}><i className="ci-edit me-2"/>{t('hero.biography.edit')}</Dropdown.Item>
                <Dropdown.Item onClick={onClickDelete}
                    disabled={delDisabled}><i className="ci-trash-empty me-2"/>{t('hero.biography.delete')}</Dropdown.Item>

                 
            </Dropdown.Menu>
        </Dropdown>
    ) 
}

export default HeroBioDropdown;