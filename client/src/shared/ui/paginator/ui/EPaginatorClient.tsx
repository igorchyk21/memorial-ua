"use client"
import { PaginatorType } from "@global/types";
import EPaginator from "./EPaginator";
import { useQueryState } from "@/shared/hooks/query/useQueryState";

interface Props {
    paginator:PaginatorType;
    className?:string;
}

const EPaginatorClient = ({paginator,className}:Props) => {
    const [ page, setPage ] = useQueryState<number>('page',paginator.currentPage);
    return (
        <EPaginator 
            setPage={setPage}
            className={className}
            paginator={paginator}/>
    ) 

}

export default EPaginatorClient;