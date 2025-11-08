"use client"
import { HeroPosts, useHeroPostDelete, useHeroPostEdit } from "@/features/hero";
import ReCaptcha from "@/shared/context/reCaptcha/ReCaptcha";
import { CommonComponentChildren } from "@/types";
import { HeroPostType } from "@global/types";
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
 
interface Props {
    heroId:number;
    posts:HeroPostType[];
}

const HeroPostsListWidget = ({posts, heroId}:Props) => {

    const t = useTranslations();
    const { handleClickEdit, handleClickStatus } = useHeroPostEdit(heroId);
    const { handleClickDelete } = useHeroPostDelete();

    return (<>
        <div className="d-sm-flex align-items-center gap-3 pt-5 mt-md-2 mb-3" id="comments" style={{ scrollMarginTop: 60 }}>
            <h2 className="h4 mb-0">{t('hero.post.title')} {posts.length>0?`(${posts.length})`:''}</h2>
            <Button variant="primary" 
                className="rounded-pill ms-auto mt-2 mt-sm-0"
                onClick={()=>handleClickEdit(null)}>
                <i className="ci-edit-3 fs-base ms-n1 me-2" />
                    {t('hero.post.leavePost')}
            </Button>
        </div> 
        {posts &&
            (<HeroPosts  
                onClickEdit={handleClickEdit}
                onClickDelete={handleClickDelete}
                onClickStatus={handleClickStatus}
                posts={posts}/>)}
    </>)
}

export default HeroPostsListWidget;