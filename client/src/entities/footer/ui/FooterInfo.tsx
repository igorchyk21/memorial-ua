import conf from "@/shared/config/conf";
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap"

const FooterInfo = () => {
    const t = useTranslations();
    return (
        <Col lg={3} className="text-center text-lg-start pb-sm-2 pb-md-0 mb-4 mb-md-5 mb-lg-0">
            <h4 className="pb-2 mb-1">
              <Link href="/" className="text-dark-emphasis text-decoration-none">
                {t('footer.title')}
              </Link>
            </h4>
            <p className="fs-sm text-body mx-auto" style={{ maxWidth: 480 }}>
                {t('footer.description')}
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-2 pt-2 pt-md-3">
              {[
                { name: 'Facebook', icon: 'ci-facebook', href: conf.social.facebook1 },
                { name: 'Facebook', icon: 'ci-facebook', href: conf.social.facebook2 },
                { name: 'Instagram', icon: 'ci-instagram', href: conf.social.instagram1 },
                { name: 'Instagram', icon: 'ci-instagram', href: conf.social.instagram2 },
                { name: 'Tiktok', icon: 'ci-tiktok', href: conf.social.tiktok }
              ].map(({ name, icon, href }, index) => (
                <OverlayTrigger
                  key={index}
                  placement="top"
                  overlay={
                    <Tooltip className="tooltip-transparent fs-xs mb-n2">
                      <span className="text-white">{name}</span>
                    </Tooltip>
                  }
                >
                  <Button
                    target="_blank"
                    href={href}
                    variant="outline-secondary"
                    className="btn-icon fs-base border-0"
                    aria-label={`Follow us on ${name}`}>
                    <i className={icon} />
                  </Button>
                </OverlayTrigger>
              ))}
            </div>
          </Col>
    )
}

export default FooterInfo;