"use client"
import { useTranslations } from "next-intl";
import { Button } from "react-bootstrap";
import useFilterResult from "../model/useFilterResult";
 
interface Props {
    count:number;
}

const FilterResult = ({count}:Props) => {
    const t = useTranslations('hero');
    const { search,
            handleClearSearch,
            onclyCandle,
            handleClearCandle} = useFilterResult();
    return (
        <div className="d-md-flex align-items-start">
            <div className="h6 fs-sm fw-normal text-nowrap translate-middle-y mt-3 mb-0 me-4">
                {t('found')} <span className="fw-semibold">{count}</span> {t('heroes')}
            </div>
            <div className="d-flex flex-wrap gap-2">

                {search &&
                    (<Button variant="secondary" size="sm"
                        className="rounded-pill "
                        onClick={handleClearSearch}>      
                        <i className="ci-close fs-sm ms-n1 me-1 my-auto" />
                        <span style={{maxWidth:60}}  className="text-truncate"  >{search}</span>
                    </Button>)}

                {onclyCandle &&
                  (<Button variant="secondary" size="sm"
                    className="rounded-pill"
                    onClick={handleClearCandle}>
                    <i className="ci-close fs-sm ms-n1 me-1" />
                    {t('onclyCandle')}
                  </Button>)}

              </div>
        </div>
    )
}

export default FilterResult