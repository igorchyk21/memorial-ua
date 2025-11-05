import UserAvatar from "@/shared/ui/avatar/UserAvatar";
import { HERO_POST_STAT, HeroPostType } from "@global/types";
import { DateTime as DT } from "luxon";
import PostDropdown from "./PostDropdown";
import HeroStatus from "../HeroCard/HeroStatus";
import { Button, Spinner } from "react-bootstrap";
import { useAuth } from "@/shared/context/Auth";

interface Props  {
    post:HeroPostType;
    onClickEdit:()=>void;
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_POST_STAT)=>void;
    hideBorder?:boolean;

}
const HeroPostCard = ({post, onClickEdit, onClickDelete, onClickStatus, hideBorder}:Props) => {

    const { auth } = useAuth();

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                <div className="d-flex align-items-top">
                <div
                    className="position-relative d-flex align-items-center justify-content-center flex-shrink-0 bg-body-secondary rounded-circle overflow-hidden"
                    style={{ width: 40, height: 40 }}>
                    <UserAvatar
                        picture={post.userPicture}
                        name={post.author || post.userName || '-'}/>
                
                </div>
                <div className="ps-2 ms-1">
                    <div className="fs-sm fw-semibold text-dark-emphasis">{post.userName || post.author}</div>
                    <div className="fs-xs text-body-secondary">{DT.fromMillis(post.dt||0).setLocale("uk").toLocaleString(DT.DATE_FULL)}</div>
                    {post.status !== HERO_POST_STAT.ACTIVE &&
                    (<HeroStatus status={post.status}/>)}
                </div>
                </div> 
                
                <div className="d-flex gap-2"> 

                    {auth?.user.admin &&
                    (<PostDropdown 
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                        onClickStatus={onClickStatus}
                        postStatus={post.status}/>)}

                    {!auth?.user.admin && auth?.user &&
                    (<Button
                        className={`btn-icon border-0 animate-slide-end bg-body rounded-pill`}
                        variant="secondary"
                        size="sm"
                        onClick={onClickDelete}>
                            <i className="ci-trash-empty animate-target fs-sm" style={{width:14}} />
                    </Button>)}
                    
                </div>
            </div>
            <div className={`pb-3 ${hideBorder ? '' : 'border-bottom '}`}>{post.body}</div>
        </div>        
    )
}

export default HeroPostCard;