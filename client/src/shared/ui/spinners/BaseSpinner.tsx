import { Spinner } from "react-bootstrap";

interface Props {
    show:boolean;
}

const BaseSpinner = ({show}:Props) => {
    return (
        <div className={`w-100 d-flex py-5 ${show ? '' : 'd-none'}`}>
            <Spinner variant="primary" className="m-auto"/>
        </div>
    )
}

export default BaseSpinner;