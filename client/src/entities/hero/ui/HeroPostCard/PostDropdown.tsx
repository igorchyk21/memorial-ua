"use client"
import { HERO_POST_STAT } from "@global/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Dropdown, Spinner } from "react-bootstrap"

interface Props {
    onClickEdit:()=>void;
    onClickDelete:()=>void;
    onClickStatus:(newStatus:HERO_POST_STAT)=>void;
    postStatus:HERO_POST_STAT
} 
  
const PostDropdown = ({onClickEdit,onClickDelete,onClickStatus,postStatus}:Props) => {

    const t = useTranslations();
    const [ spinner, setSpinner ] = useState(false)

    const clickStatus = async (status:HERO_POST_STAT) => {
        setSpinner(true);
        await onClickStatus(status)
        setSpinner(false);
    }
    return ( 
        <Dropdown>
            <Dropdown.Toggle as={Button}
                disabled={spinner}
                className={`btn-icon border-0 animate-slide-end bg-body rounded-pill`}
                variant="secondary"
                size="sm">
                    {spinner
                    ?(<Spinner style={{height:16, width:16}}/>)
                    :(<i className="ci-tool animate-target fs-sm" style={{width:14}} />)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onClickEdit}><i className="ci-edit me-2"/>{t('hero.post.edit')}</Dropdown.Item>
                <Dropdown.Item onClick={onClickDelete}><i className="ci-trash-empty me-2"/>{t('hero.post.delete')}</Dropdown.Item>
                <Dropdown.Divider/>
                {[HERO_POST_STAT.PENDING, HERO_POST_STAT.REJECT].includes(postStatus) &&
                (<Dropdown.Item onClick={async ()=>clickStatus(HERO_POST_STAT.ACTIVE)}><i className="ci-check-circle me-2"/>{t('hero.post.accept')}</Dropdown.Item>)}

                {[HERO_POST_STAT.PENDING, HERO_POST_STAT.ACTIVE].includes(postStatus) &&
                (<Dropdown.Item onClick={async ()=>clickStatus(HERO_POST_STAT.REJECT)}><i className="ci-close-circle me-2"/>{t('hero.post.reject')}</Dropdown.Item>)}

            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PostDropdown;