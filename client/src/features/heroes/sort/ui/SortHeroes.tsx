"use client"
import SelectBox from "@/shared/ui/forms/select-box";
import { useTranslations } from "next-intl";
import { FormLabel } from "react-bootstrap";
import { sortVariant } from "../const/sortVariant";
import useSortHeroes from "../model/useSortHeroes";

const SortHeroes = () => {
    const t = useTranslations('hero');
    const { sort, handleSortChange } = useSortHeroes(); 
    return (
        <div className="d-flex align-items-center justify-content-between justify-content-md-end text-nowrap">
              <FormLabel className="fw-semibold mb-0 me-2">{t('sort.label')}</FormLabel>
              <div >
                <SelectBox
                    className="SortHero"
                    choices={
                        sortVariant.map(sort=> ({
                            value:sort!=='organic' ? sort : '',
                            label:t(`sort.${sort}`)
                        } ))
                    }
                    value={sort||''}
                    removeItemButton={false}
                    inputClassName="border-0 rounded-0 px-1"
                    aria-label="Sort"
                    onChange={(v) => handleSortChange(v as string)}
                />
              </div>
            </div>
    )
}

export default SortHeroes;