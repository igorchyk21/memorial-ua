import { EPaginator } from "@/shared/ui/paginator"
import { PaginatorType } from "@global/types"
import useHeroPaginator from "../model/useHeroPaginator";

interface Props {
    paginator:PaginatorType;
}

const HeroPaginator = ({paginator}:Props) => {

    const { handleOnClickPage } = useHeroPaginator();

    return (
        <EPaginator  
            className="d-flex mb-5"
            paginator={paginator} 
            setPage={handleOnClickPage}/>
    )
}

export default HeroPaginator;