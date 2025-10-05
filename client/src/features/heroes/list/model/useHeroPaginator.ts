import { useQueryState } from "@/shared/hooks/query/useQueryState";

const useHeroPaginator = () => {


    const [ page, setPage ] = useQueryState('page');

    const handleOnClickPage = (page:number) => {
        window.scrollTo(0,0);
        setPage(`${page}`);
    }   

    return { 
        handleOnClickPage
    }
}

export default useHeroPaginator;