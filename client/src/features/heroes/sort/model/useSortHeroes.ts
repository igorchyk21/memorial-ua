"use client"
import { useQueryState } from "@/shared/hooks/query/useQueryState";

const useSortHeroes = () => {

    const [ sort, setSort ] = useQueryState<string>('sort');
     
    const handleSortChange = (newSort:string) => {
        setSort(newSort)
    }
    return {
        sort,
        handleSortChange
    }
}

export default useSortHeroes;