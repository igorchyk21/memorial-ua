import { heroDeleteBio } from "@/entities/hero";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { HeroBiographyItem } from "@global/types"
import { useTranslations } from "next-intl"

export const useHeroBioDelete = () => {

    const t = useTranslations();
    const { showToast } = useToast();
    const { showDialog, hideDialog } = useModal();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const deleteBio = async (biographyId:number) => {
        const resDel = await heroDeleteBio(biographyId);
        if (!resDel) showToast(t('error'), 'danger');
            else showToast(t('hero.messDeleteEvent'), 'success');
        setUpdate(Date.now().toString());
    }

    const handleDelete = (biographyItem:HeroBiographyItem) => {
        showDialog({
            open:true,
            title:t('hero.biography.titleDelete'),
            content:(<>
                <h4>{biographyItem.title.startsWith('t_') ? t(`hero.biography.${biographyItem.title}`) : biographyItem.title}</h4>
                {biographyItem.body &&
                (<> 
                    <hr/>
                    <div>{biographyItem.body.split('\n').map((p:string,i:number)=>(<p className="fs-12" key={i}>{p}</p>))}</div>
                </>)}
                </>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:async()=>await deleteBio(biographyItem.ID)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
        })
    }

    return {
        handleDelete
    }
} 