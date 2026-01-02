import { useTranslations } from "next-intl";

interface Props {
    title:string;
    description?:string;
}

const AlertEmpty = ({ title, description }:Props) => {
    const t = useTranslations();
    return (
        <div className="text-center mt-5 mb-5">
            <h4 className="mt-3 text-center">{title}</h4>
            <p className="text-center">{description}</p>
            <div className="mt-4 pt-3 border-top d-inline-block text-start">
                <div className="fw-semibold text-body-secondary mb-2 d-flex align-items-center justify-content-center pb-2">
                    <i className="ci-message-circle fs-base me-2"></i>
                    <span>{t('support')}</span>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                    <a style={{width:150}}
                        href="https://t.me/UHOFID_discussion"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center">
                        <i className="ci-telegram fs-base me-2"></i>
                        <span>Telegram</span>
                    </a>
                    <a style={{width:150}}
                        href="mailto:uhofid@gmail.com"
                        target="_blank"
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center">
                        <i className="ci-mail fs-base me-2"></i>
                        <span>Email</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AlertEmpty;