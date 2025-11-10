import { useTranslations } from "next-intl"
import SelectBox from "./select-box"

interface Props {
    value:string;
    onChange:(v:string|string[])=>void;
    required?:boolean;
    placeholder?:string;
    searchEnabled?:boolean;
    disabled?:boolean;
}

const regions = [
  "KV", "VI", "VO", "DP", "DO", "ZH", "ZR", "ZA", "IF",
  "KH", "KR", "LU", "LV", "MY", "OD", "PO", "RI", "SU",
  "TE", "HE", "KM", "CH", "CV", "CN", "SE", "AR"
]


const SelectRegions = ({value, onChange, required, placeholder, searchEnabled, disabled}:Props) => {
    const t = useTranslations('map');
    return (
        <SelectBox 
            value={value}
            onChange={(v)=>onChange(v)}
            disabled={disabled}
            required={required}
            choices={regions.map(region=>({value:region, label:t(region)}))}
            searchEnabled={searchEnabled}
            placeholder={placeholder}/>
    )
}

export default SelectRegions;