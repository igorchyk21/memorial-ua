import { HERO_PHOTO_STAT, HERO_POST_STAT, HERO_STAT } from "@global/types";
import { useTranslations } from "next-intl";
import { Badge } from "react-bootstrap";

interface Props {
    status:HERO_STAT | HERO_POST_STAT | HERO_PHOTO_STAT
}
const statuses:Record<HERO_STAT | HERO_POST_STAT,{title:string; bg:string;} | null> = {
    "-1":{title:'reject', bg:'danger'},
    "0":{title:'panding', bg:'warning'},
    "1":{title:'active', bg:'success'},
}
 
const HeroStatus = ({status}:Props) => {
    const t = useTranslations();
    return (<>
    <Badge className="fs-12 fw-bold"
        bg={statuses?.[status]?.bg}>{t(`hero.status.${statuses?.[status]?.title}`)}</Badge>
    </>)
}

export default HeroStatus;