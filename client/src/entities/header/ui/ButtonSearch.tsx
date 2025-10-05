import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap"

interface Props {
    searchOpen:boolean;
    setSearchOpen:Dispatch<SetStateAction<boolean>>;
}

const ButtonSearch = ({searchOpen, setSearchOpen}:Props) => {
    return (
        <Button 
            variant="secondary"
            className="btn-icon fs-xl border-0 rounded-circle animate-shake d-md-none"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-expanded={searchOpen}>
            <i className="ci-search animate-target" />
        </Button>
    )
}

export default ButtonSearch;