import { ReactNode } from "react";

const { Spinner } = require("react-bootstrap");

interface Props {
    titleButton:string|ReactNode; 
    titleSpinner?:string|null;
    showSpinner:boolean;
    className?:string;
}



const SpinnerTitle = ({titleButton, showSpinner, titleSpinner, className="me-2"}:Props) => {
    return (showSpinner)
        ? (<>
        <div className="d-flex align-items-center justify-content-center">
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className={className}>
            
        </Spinner>
        {Boolean(titleSpinner) ? titleSpinner : titleButton}
        </div>
        </>)
        : titleButton;
}

export default SpinnerTitle;