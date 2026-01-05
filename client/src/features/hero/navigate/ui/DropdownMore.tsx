import { useTranslations } from "next-intl";
import Link from "next/link"
import { Dropdown } from "react-bootstrap"

interface Props { 
    aPathName:string[];
}

const DropdownMore = ({aPathName}:Props) => {
    const heroUrl = aPathName?.[2]||'';
    const t = useTranslations();
    return ( 
        <Dropdown className="d-block d-md-none" placement="bottom-end">
            <Dropdown.Toggle 
                className={`nav-link px-2 ${['photo','video','audio'].includes(aPathName?.[3]||'-') && 'active'}`}>{t('hero.navigate.more')}</Dropdown.Toggle>
            <Dropdown.Menu style={{zIndex:9999}}>
                <Dropdown.Item as={Link} 
                    className={aPathName?.[3] === 'photo' ? 'active' :''}
                    href={`/hero/${heroUrl}/photo`}>
                        <i className="ci-image me-2" />
                        {t('hero.navigate.photo')}
                    </Dropdown.Item>

                <Dropdown.Item as={Link}
                    className={aPathName?.[3] === 'video' ? 'active' :''}
                    href={`/hero/${heroUrl}/video`}>
                        <i className="ci-video me-2" />
                        {t('hero.navigate.video')}
                    </Dropdown.Item>

                <Dropdown.Item as={Link}
                    className={aPathName?.[3] === 'audio' ? 'active' :''}
                    href={`/hero/${heroUrl}/audio`}>
                        <i className="ci-volume-2 me-2" />
                        {t('hero.navigate.audio')}
                    </Dropdown.Item>

                <Dropdown.Item as={Link}
                    className={aPathName?.[3] === 'candles' ? 'active' :''}
                    href={`/hero/${heroUrl}/candles`}>
                        <i className="ci-sun me-2" />
                        {t('hero.navigate.candles')}
                    </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownMore;