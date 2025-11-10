import { useQueryState } from "@/shared/hooks/query/useQueryState";
import TopButtonBadge from "@/shared/ui/badges/TopButtonBadge";
import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap"

interface Props {
    searchOpen:boolean;
    setSearchOpen:Dispatch<SetStateAction<boolean>>;
}

const ButtonSearch = ({searchOpen, setSearchOpen}:Props) => {
    const [ search ] = useQueryState<string>('search');

    return (
        <Button 
            variant="secondary"
            className="btn-icon fs-xl border-0 rounded-circle animate-shake d-md-none position-relative"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-expanded={searchOpen}>
            <i className="ci-search animate-target" />
            {search &&
            (<TopButtonBadge/>)}
        </Button>
    )
}

export default ButtonSearch;
