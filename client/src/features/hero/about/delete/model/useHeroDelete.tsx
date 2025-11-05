"use client"
import { heroDelete } from "@/entities/hero";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation";
import { Alert } from "react-bootstrap";

export const useHeroDelete  = (heroId:number, heroName:string) => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog, hideDialog } = useModal();
    const router = useRouter();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const _heroDelete = async () => {
        const resDelete = await heroDelete(heroId);
        hideDialog();
        if (resDelete) {
            showToast(t('hero.messDeleteSuccess'), 'success');
            router.push('/');
            return
        }
            else showToast(t('error'),'danger');
            
        setUpdate(Date.now().toString())
        
    }

    const handleClickDelete = () => {
        showDialog({
            open:true,
            title:t('hero.about.titleDelete'),
            content:(<>
                <h5>{t('hero.about.confirmDelete')} {heroName}?</h5><hr/>
                <p className="fs-5">{t('hero.about.infoDelete')}</p>
                <Alert>{t('hero.about.infoRedirect')}</Alert>
                </>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:_heroDelete},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary', onClick:()=>hideDialog()}}
            ],
        })
    }

    return {
        handleClickDelete
    }
}

 