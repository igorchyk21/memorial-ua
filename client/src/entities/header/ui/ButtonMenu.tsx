import { Navbar } from "react-bootstrap"

interface Props { 
    onClick:()=>void;
}

const ButtonMenu = ({onClick}:Props) => {
    return (
        <Navbar.Toggle className="d-block flex-shrink-0 me-1 me-md-3 me-sm-4" onClick={onClick} />
    )
}
 
export default ButtonMenu;