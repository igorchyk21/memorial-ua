"use client"
import { Dispatch, SetStateAction } from "react";
import { Collapse, Container, FormControl } from "react-bootstrap";
import useSearch from "../model/useSearch";
import { useTranslations } from "next-intl";

interface Props {
    searchOpen:boolean;
    setSearchOpen:Dispatch<SetStateAction<boolean>>;
}

const SearchCollapse = ({searchOpen, setSearchOpen}:Props) => {

    const t = useTranslations();
    const { refSearchCollapse,
            searchValue, setSearchValue,
            handleSubmit} = useSearch();

    return (

        <Collapse in={searchOpen} className="d-md-none">
            <div id="searchBar">
                <form onSubmit={handleSubmit} id="collapse">
                <Container className="pt-2 pb-3">
                    <div className="position-relative">
                        <i className="ci-search position-absolute top-50 translate-middle-y d-flex fs-lg ms-3" />
                        <FormControl
                            type="search"
                            className="form-icon-start rounded-pill"
                            placeholder={t('hero.searchHero')}
                            ref={refSearchCollapse}
                            value={searchValue}
                            onChange={(e)=>setSearchValue(e.target.value)}/>
                    </div>
                </Container>
                </form>
            </div>
        </Collapse>
    )
}

export default SearchCollapse;