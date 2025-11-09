"use client"
import { Button } from "react-bootstrap"
import { HERO_POST_STAT, HeroPostType } from "@global/types";
import { HeroPostCard } from "@/entities/hero";
import { useTranslations } from "next-intl";
 

interface Props {
    posts:HeroPostType[];
    onClickEdit:(post:HeroPostType)=>void;
    onClickDelete:(postId:number, postBody:string, author:string)=>void;
    onClickStatus:(postId:number, newStatus:HERO_POST_STAT)=>void;    
} 

const HeroPosts = ({posts, onClickEdit,onClickDelete,onClickStatus}:Props) => {
    const t = useTranslations();
    return (<>
        <div className="bg-body-tertiary rounded-4 p-4 p-sm-5 mb-4">
            <div className="vstack gap-3 gap-md-4 mt-n3">
                {posts.map((post,i)=>( 
                    <HeroPostCard   
                        key={post.ID} post={post}
                        onClickEdit={()=>onClickEdit(post)}
                        onClickDelete={()=>onClickDelete(post.ID, post.body, post.author||post.userName||'-')}
                        onClickStatus={(newStatus)=>onClickStatus(post.ID, newStatus)}/>
                ))}

                {posts.length === 0 && 
                (<h5 className="mt-3 text-center">{t('hero.post.empty')}</h5>)}
            </div>
        </div> 
    </>)
}

export default HeroPosts;