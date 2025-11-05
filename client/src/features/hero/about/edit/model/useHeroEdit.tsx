import { useModal } from "@/shared/context/Modal/model/useModal";
import { HERO_STAT, HeroShortType } from "@global/types"
import { useTranslations } from "next-intl"
import HeroEditForm from "../ui/HeroEditForm";
import { useTheme } from "next-themes";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { heroSave, heroSetStatus } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";

export const useHeroEdit = (hero:HeroShortType) => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog, hideDialog } = useModal();
    const { resolvedTheme } = useTheme();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const handleSubmit = async (values:HeroShortType)=> {
        const resSave = await heroSave(hero.ID, values);
        if (resSave) showToast(t('hero.messSavedSuccess'), 'success');
            else showToast(t('error'),'danger');
        setUpdate(Date.now().toString())
        hideDialog();
    }

    const handleClickEdit = () => {
        showDialog({
            open:true,
            title:t('hero.about.edit'),
            buttons:[],
            width:1100,
            content:<HeroEditForm
                        hero={hero}
                        darkTheme={resolvedTheme === 'dark'}
                        handleCancel={()=>hideDialog()}
                        handleSubmit={handleSubmit}/>,
        })
    }

    const handleClickStatus = async (newStatus:HERO_STAT) => {
        const resStat = await heroSetStatus(hero.ID, newStatus);
        if (!resStat) showToast(t('error'),'danger');
        setUpdate(Date.now().toString())
    }

    return {
        handleClickEdit,
        handleClickStatus
    }
}

 