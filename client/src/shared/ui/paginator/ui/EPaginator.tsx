"use client"
import { memo } from "react";
import { PageItem, Pagination } from "react-bootstrap";
import { createPaginatorArray } from "../model/createPaginatorArray";
import Link from "next/link";
import { PaginatorType } from "@global/types";
 

interface PaginatroProps {
    paginator:PaginatorType | null;
    className?:string;
    pageHref?:string;
    setPage?: (page:number) => void;
}

const EPaginator = memo(({paginator, setPage, pageHref, className='d-flex mt-4'}: PaginatroProps) => {
 
    const aPaginator = createPaginatorArray(
        paginator?.countPages||1,
        paginator?.currentPage||1
    );

    if ((!paginator?.countPages) || (paginator?.countPages==1)) return null;
    return (   
        <>
        {paginator &&
        (<nav className={className}>
            
            <Pagination size="lg" className="mb-4 mx-auto">
                
                {typeof setPage === 'function' 
                ?(<PageItem className="first" 
                    onClick={()=>setPage(1)}>
                    <span aria-hidden="true">«</span>
                </PageItem>)
                
                :(<PageItem className="first" as={Link} href={pageHref?.replace('[PAGE]', '1')||'#'}>«</PageItem>)}
                

                {aPaginator.map((page:any)=>{
                    const pageTitle = (page>=0) ? page+1 : '...'
                    const pageIndex = Math.abs(page)+1;
                    const pageClass = ((page + 1 === paginator.currentPage) )  ? 'active' : '';                  
                    const aClass= ((page + 1 === paginator.currentPage) ) ? 'bg-primary text-white' : '';
                    return (<div key={`paginatorPage-${page}`} >
                            {typeof setPage === 'function'
                                ?(<PageItem className={pageClass}
                                    onClick={()=>setPage(pageIndex)}>{pageTitle}</PageItem>)
                                :(<PageItem as={Link} 
                                    className={pageClass}
                                    href={pageHref?.replace('[PAGE]', `${pageIndex}`)||'#'}>{pageTitle}</PageItem>)}
                    </div>)
                })}

                
                {typeof setPage === 'function'
                    ?(<PageItem className="last"
                        onClick={()=>setPage(paginator.countPages)}>
                        <span aria-hidden="true">»</span>
                    </PageItem>)

                    :(<PageItem className="last" as={Link} href={pageHref?.replace('[PAGE]', `${paginator.countPages}`)||'#'}>»</PageItem>)}
                
            </Pagination>

        </nav>)}
        </> 
        
    );
},  (prevProps, nextProps) =>{
    return (nextProps.paginator?.currentPage ===-1)
})

EPaginator.displayName = "EPaginator";


export default EPaginator;
 