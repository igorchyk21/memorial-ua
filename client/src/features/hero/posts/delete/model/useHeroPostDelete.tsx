import { heroDeletePost } from "@/entities/hero";
import { useModal } from "@/shared/context/Modal/model/useModal";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useTranslations } from "next-intl"

export const useHeroPostDelete = () => {
    const t = useTranslations();
    const { showToast } = useToast();
    const { hideDialog, showDialog } = useModal();
    const [ update, setUpdate ] = useQueryState<string>('update');

    const _postDelete = async (postId:number) => {
        const resDel = await heroDeletePost(postId);
        if (!resDel) showToast(t('error'), 'danger');
            else showToast(t('hero.messDeletePost'), 'success');
        setUpdate(Date.now().toString());
    }

    const handleClickDelete = (postId:number, postBody:string, author:string) => {
        showDialog({
            open:true,
            title:t('hero.post.titleDelete'),
            content:(<>
                <h4>{author}</h4><hr/>
                <span className="fs-12">{postBody}</span>
                </>),
            buttons:[
                {title:t('buttons.delete'), buttonProps:{variant:'danger'}, onClick:async()=>await _postDelete(postId)},
                {title:t('buttons.cancel'), buttonProps:{variant:'secondary'}, onClick:()=>hideDialog()}
            ],
        })
    }

    return {
        handleClickDelete
    }
}
 