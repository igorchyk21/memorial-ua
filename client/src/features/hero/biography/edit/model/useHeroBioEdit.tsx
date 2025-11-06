import { useModal } from "@/shared/context/Modal/model/useModal"
import { useToast } from "@/shared/context/Toast/models/useToast";
import { HeroBiographyItem } from "@global/types"
import { useTranslations } from "next-intl";
import BioEditForm from "../ui/BioEditForm";
import { heroSaveBio } from "@/entities/hero";
import { useQueryState } from "@/shared/hooks/query/useQueryState";


export const useHeroBioEdit = (heroId:number) => {
    
    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog, hideDialog } = useModal();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const emptyBiography:HeroBiographyItem = {
        ID:0,
        heroId,
        title:'',
        dt:0,
        body:'',
    }


    const handleSubmit = async (values:HeroBiographyItem) => {
        const resSave = await heroSaveBio(values.ID, values)
        if (resSave) {
            showToast(t('hero.messEventSaved'), 'success');
            hideDialog();
        } else showToast(t('error'), 'danger');
        setUpdate(Date.now().toString());
    }

    const handleEdit = (biographyItem:HeroBiographyItem|null) => {
        
        const item = biographyItem ? biographyItem : emptyBiography;
        if (item.title.startsWith('t_')) item.title = t(`hero.biography.${item.title}`);

        showDialog({
            open:true,
            title:t(`hero.biography.${item.ID?'editItem':'createItem'}`),
            width:900,
            content:(<BioEditForm
                        item={item}
                        handleCancel={()=>hideDialog()}
                        handleSubmit={handleSubmit}/>),
                        buttons:[]
        }) 
    }

    return {
        handleEdit
    }
}