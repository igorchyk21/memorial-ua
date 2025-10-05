import { Button } from "react-bootstrap"

interface Props {
    onClick:()=>void;
}

const ButtonLocation = ({onClick}:Props) => {
    return (
        <Button
            variant="secondary"
            className="btn btn-icon fs-lg border-0 rounded-circle animate-shake d-lg-none d-flex "
            onClick={onClick}>
            <i className="ci-map-pin animate-target"/>
        </Button>)
}

export default ButtonLocation;
