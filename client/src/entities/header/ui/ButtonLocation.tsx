import { useQueryState } from "@/shared/hooks/query/useQueryState";
import TopButtonBadge from "@/shared/ui/badges/TopButtonBadge";
import { Badge, Button } from "react-bootstrap"

interface Props {
    onClick:()=>void;
}

const ButtonLocation = ({onClick}:Props) => {
    const [ region ] = useQueryState<string>('region');
    return (
        <Button
            variant="secondary"
            className="btn btn-icon fs-lg border-0 rounded-circle animate-shake d-lg-none d-flex position-relative"
            onClick={onClick}>
            <i className="ci-map-pin animate-target"/>
            {region &&
            (<TopButtonBadge/>)}
        </Button>)
}

export default ButtonLocation;
