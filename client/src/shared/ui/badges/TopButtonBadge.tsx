import { Badge } from "react-bootstrap"

const TopButtonBadge = () => {
    return (
        <Badge bg="danger" 
            style={{height:10, width:10, top:5, right:-3}}
            className="position-absolute rounded-circle  translate-middle p-0">&nbsp;</Badge>
    )
}

export default TopButtonBadge;