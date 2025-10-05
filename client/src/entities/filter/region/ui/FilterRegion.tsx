import SelectBox from "@/shared/ui/forms/select-box";
import { regions } from "../const/regions";
import { useTranslations } from "next-intl";
import { CodeCityMap } from "../types";

interface Props {
    value:string;
    onChange:(cityCode:string)=>void;
}

const FilterRegion = ({value, onChange}: Props) => {
    const t = useTranslations();
    return (
        <SelectBox   
            className="select-box-big mb-3"
            searchEnabled={true} 
            choices={regions.map(region=>({value:region, label:t(`map.${region}`)}))}
            value={value}
            onChange={(value) => onChange(value as string)}
            inputClassName="filter-select rounded-pill" 
            searchPlaceholder={`${t('buttons.search')} ...`}
            placeholder={t('location.selectRegion')}
            aria-label="Sorting"/>  
    )
}

export default FilterRegion;