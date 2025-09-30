"use client"
import { useTranslations } from "next-intl"
import { EModalButton, EModalButtonsCollection } from "../types/modal.type"
import { Button } from "react-bootstrap";

const useButtonsCollections = () => {

    const t = useTranslations();

    const _CANCELBTN: EModalButton = {
        title:t('buttons.cancel'),
        buttonProps:{variant:'secondary'},
    }

    const _DeleteCancel: EModalButton[] = [
        {   
            title:t('buttons.delete'),
            buttonProps:{ variant:'danger' },
        },
        _CANCELBTN
    ]

    const _YesCancel: EModalButton[] = [
        {   
            title:t('buttons.yes'),
            buttonProps:{ variant:'primary' },
        },
        _CANCELBTN
    ]    

    const getButtons = (bCollection:EModalButtonsCollection): EModalButton[]  => {
        switch (bCollection){
            case 'YesCancel': return _YesCancel;;
            case 'DeleteCancel': return _DeleteCancel;
        }
        return [];
    }

    return {
        getButtons
    }
}

export default useButtonsCollections;