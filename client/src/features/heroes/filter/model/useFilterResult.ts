import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useSetMultipleQuery } from "@/shared/hooks/query/useSetMultipleQuery";

const useFilterResult = () => {
    
    const [ search, setSearch ] = useQueryState<string>('search');
    const [ onclyCandle, setOnlyCandle ] = useQueryState('onlyCandle');
    const miltipleQuery = useSetMultipleQuery();
    
    const handleClearSearch = () => {
        miltipleQuery({
            search:'',
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
        handleClearCandle
    }
}

export default useFilterResult;