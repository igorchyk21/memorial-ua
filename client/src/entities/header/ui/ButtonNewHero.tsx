import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "react-bootstrap";

interface Props {
    onClick:()=>void;
}

const ButtonNewHero = ({onClick}:Props) => {
    const t = useTranslations();
    return (<>
        <Link 
            className="rounded-pill btn btn-primary me-2 px-3 d-none d-sm-flex"
            href="/new"
            onClick={onClick}> 
            {t('hero.addHero')}
        </Link>
        <Link
            className="btn btn-primary btn-icon fs-lg border-0 rounded-circle animate-shake d-sm-none d-flex"
            onClick={onClick}
            href="/new">            
            <i className="ci-plus animate-target" />
        </Link>
    </>)
}

export default ButtonNewHero;