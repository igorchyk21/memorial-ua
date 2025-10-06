"use client"
import { useRouter } from "@bprogress/next/app";       // <-- ВАЖЛИВО
import { useQueryState } from "@/shared/hooks/query/useQueryState";
import { useSetMultipleQuery } from "@/shared/hooks/query/useSetMultipleQuery";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

const useSearch = () => {

    const pathname = usePathname();    
    const miltipleQuery = useSetMultipleQuery();
    const router = useRouter();
    const [ search, setSearch ] = useQueryState<string>('search');
    const [ sort ] = useQueryState<string>('sort');
    const [ searchValue, setSearchValue ] = useState<string>('');
    const refSearchInput = useRef<HTMLInputElement>(null);
    const refSearchCollapse = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let search = '';
        if (e.currentTarget.id == 'search') search = refSearchInput.current?.value||'';
        if (e.currentTarget.id == 'collapse') search = refSearchCollapse.current?.value||'';

         
        if (pathname === '/heroes')
            miltipleQuery({
                search:search,
                sort:sort,
                page:'1'
            })

        else router.push(`/heroes?search=${search}`)
    }

    useEffect(()=>{
        if (search !== undefined) 
            setSearchValue(prev => (prev === search ? prev : search));
    },[search])

    useEffect(()=>{
        setSearchValue(prev => (prev === search ? prev : search||''));
    }, [pathname])

    return {
        handleSubmit,
        refSearchInput,
        refSearchCollapse,
        searchValue, 
        setSearchValue
    }
}

export default useSearch;