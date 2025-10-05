import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";

interface Props {
    onClick:()=>void;
}

const ButtonNewHero = ({onClick}:Props) => {
    const t = useTranslations();
    return (<>
        <Button 
            className="rounded-pill me-2 px-3 d-none d-sm-inline"
            onClick={onClick}> 
            {t('hero.addHero')}
        </Button>
        <Button
            onClick={onClick}
            className="btn btn-icon fs-lg border-0 rounded-circle animate-shake d-sm-none d-inline">
            <i className="ci-plus animate-target" />
        </Button>
    </>)
}

export default ButtonNewHero;