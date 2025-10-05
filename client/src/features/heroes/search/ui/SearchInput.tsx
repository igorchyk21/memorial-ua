import { useTranslations } from "next-intl";
import { Button, FormControl } from "react-bootstrap";
import useSearch from "../model/useSearch";

const SearchInput = () => { 

    const t = useTranslations();
    const { searchValue, setSearchValue, refSearchInput, handleSubmit } = useSearch();
    return (
        <div className="position-relative w-100 d-none d-md-block me-3 me-xl-4"                 
            style={{maxWidth:400}}>
            <form onSubmit={handleSubmit} id="search">
            <FormControl
                type="search"
                size="lg"
                ref={refSearchInput}
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
                className="rounded-pill"
                placeholder={t('hero.searchHero')}
                aria-label="Search"/>
            
            <Button
                variant="secondary"
                className="btn-icon btn-ghost fs-lg border-0 position-absolute top-0 end-0 rounded-circle mt-1 me-1"
                aria-label="Search button">
                <i className="ci-search" />
            </Button>
            </form>
        </div>
    )
}

export default SearchInput;