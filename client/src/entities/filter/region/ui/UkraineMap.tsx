import MapSvgMotion from "./MapSvgMotion";

interface Props {
    onClick:(cityCode:string)=>void;
}

const UkraineMap = ({onClick}:Props) => {
    return (<>
        <MapSvgMotion   
            fontSize={18}
            onClickCity={onClick}/>
    </>)
}

export default UkraineMap;