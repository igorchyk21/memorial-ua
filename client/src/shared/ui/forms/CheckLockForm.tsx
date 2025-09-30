import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Form } from "react-bootstrap";

interface Props {
    isSubmitting?:boolean;
    textInfo?:string;
    textLink?:string;
    hrefLink?:string;
}

const CheckLockForm = ({isSubmitting, textInfo, textLink, hrefLink}:Props) => {
    const t = useTranslations();
    const locale = useLocale();
    return (
        <Form.Check id="privacy">
        <Form.Check.Input required disabled={isSubmitting}/>
        <Form.Check.Label>
            {textInfo ? textInfo : t('privacy')}
            <Link href={hrefLink ? hrefLink : `/${locale}/info/privacy`} target="_blank" className="text-dark-emphasis ms-2">
            {textLink ? textLink : t('privacyLink')}
            </Link>
        </Form.Check.Label>
        </Form.Check>
    )
}

export default CheckLockForm;