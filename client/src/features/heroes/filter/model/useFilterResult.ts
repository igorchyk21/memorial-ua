import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useSetMultipleQuery } from "@/shared/hooks/query/useSetMultipleQuery";


const useFilterResult = () => {
    
    const [ search, setSearch ] = useQueryState<string>('search');
    const [ region, setRegions ] = useQueryState<string>('region');
    const [ onclyCandle, setOnlyCandle ] = useQueryState('onlyCandle');
    const miltipleQuery = useSetMultipleQuery();
    
    const handleClearSearch = () => {
        miltipleQuery({
            search:'',
            page:'1'
        })
    } 

    const handleClearRegion = () => {
        miltipleQuery({
            region:'',
            page:'1'
        })
    }     

    const handleClearCandle = () => {
        setOnlyCandle('');
    }
    
    return { 
        search,
        handleClearSearch,
        onclyCandle,
        handleClearCandle,
        region, 
        handleClearRegion
    }
}

export default useFilterResult;