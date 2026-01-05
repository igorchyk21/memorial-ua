import { HeroBiographyItem, HeroBiographyType, HeroShortType } from "@global/types";
import { Button, Col, Row } from "react-bootstrap";
import { HeroBioItem } from "@/entities/hero";
import { useTranslations } from "next-intl";
interface Props {
    hero:HeroShortType;
    biography:HeroBiographyType;
    onClicEdit:(biographyItem:HeroBiographyItem|null)=>void;
    onClickDelete:(biographyItem:HeroBiographyItem)=>void;
}
const HeroBiography = ({hero, biography, onClicEdit, onClickDelete}:Props) => {

    const t = useTranslations();
   
    return (<>
        <h3 className="text-center">{`${hero.fName} ${hero.lName}`}</h3>
        <Row className="bio-container pt-4">
            {biography
                .filter((item)=>Boolean(item.dt))
                .map((item,i)=>{
                    return (<HeroBioItem  
                                onClicEdit={onClicEdit}
                                onClickDelete={onClickDelete}
                                key={i} 
                                item={item} 
                                right={Boolean(i % 2)}/>)
            })}
        </Row>
        <div className="text-center  pt-4">
            <Button 
                className="rounded-pill"
                onClick={()=>onClicEdit(null)}><i className="ci-plus me-2"/>{t('hero.biography.addButton')}</Button>
        </div>

        
    </>)
}

export default HeroBiography;