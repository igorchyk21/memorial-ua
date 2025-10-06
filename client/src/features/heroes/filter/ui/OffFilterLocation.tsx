import { Button, Offcanvas } from "react-bootstrap";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FilterRegion, UkraineMap } from "@/entities/filter";
import useFilter from "../model/useFilter";
import { useTranslations } from "next-intl";
 
interface Props  {
    show:boolean;
    setShow:Dispatch<SetStateAction<boolean>>;
}
 
const OffFilterLocation = ({show, setShow}:Props) => {

    const t = useTranslations();
    const { handleChangeRegion, regionValue } = useFilter(setShow);

    return (<> 
        <Offcanvas 
            placement="end"
            scroll
            show={show}
            onHide={()=>setShow(false)}
            style={{width:800}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <i className="ci-map-pin me-2"/>
                    {t('location.selectRegion')}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div>
                    <FilterRegion 
                        value={regionValue}
                        onChange={handleChangeRegion}/>
                </div>
                <UkraineMap
                    onClick={handleChangeRegion}/>
            </Offcanvas.Body>
            <div className="p-3 px-lg-5 mx-lg-5">
                <Button 
                    onClick={()=>handleChangeRegion('')}
                    className="rounded-pill w-100" size="lg">
                    {t('location.selectAll')}
                </Button>
            </div>
        </Offcanvas>
    </>)
}

export default OffFilterLocation;