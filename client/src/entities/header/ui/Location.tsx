import { useTranslations } from "next-intl";
import { Nav } from "react-bootstrap"

interface Props {
    onClick:()=>void;
    value:string;
}

const Location = ({onClick, value}:Props) => { 
    const t = useTranslations();
    return (
        <Nav navbar={false} className="me-4 me-xxl-5 d-none d-lg-flex align-items-center">
            <Nav.Link
              className="flex-column align-items-start animate-underline p-0"
              onClick={() => onClick()}>
              <div className="h6 fs-sm mb-0">
                <i className="ci-map-pin me-1"></i>
                {t('location.label')}
                </div>
              <div className="d-flex align-items-center fs-sm fw-normal text-body">
                <span className="animate-target text-nowrap">{value ? value : t('location.all')}</span>
                <i className="ci-chevron-down fs-base ms-1" />
              </div>
               
            </Nav.Link>
          </Nav>
    )
}

export default Location;