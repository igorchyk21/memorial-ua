import Link from "next/link"
import { Accordion, AccordionItem, Col, Nav, Row } from "react-bootstrap"
import { footerLinks } from "../const/links";
import { useTranslations } from "next-intl";

const FooterLinks = () => {
    const t = useTranslations()
    return (<>
          {/* Columns with links that are turned into accordion on screens < 500px wide (sm breakpoint) */}
          <Col lg={8} className="offset-lg-1">
            <Accordion>
              <Row>
                {footerLinks.map(({ id, title, links }) => (
                  <Col key={id} as={AccordionItem} className="border-0" eventKey={id} xs={12} sm={6}>
                    <h6 className="accordion-header" id={id}>
                      <span className="text-dark-emphasis d-none d-sm-block">{t(`footer.links.${title}`)}</span>
                      <Accordion.Button className="py-3 d-sm-none">{t(`footer.links.${title}`)}</Accordion.Button>
                    </h6>
                    <Accordion.Collapse eventKey={id} className="d-sm-block" aria-labelledby={id}>
                      <Nav as="ul" className="flex-column gap-2 pt-sm-3 pb-3 pb-sm-0 mt-n1 mb-1 mb-sm-0">
                        {links.map(({ label, href }, index) => (
                          <Nav.Item key={index} as="li" className="d-flex w-100 pt-1">
                            <Nav.Link
                              as={Link}
                              href={href}
                              active={false}
                              className="animate-underline animate-target d-inline fw-normal text-truncate p-0"
                            >
                              {t(`footer.links.${title}Items.${label}`)}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      </Nav>
                    </Accordion.Collapse>
                    <hr className="d-sm-none my-0" />
                  </Col>
                ))}
              </Row>
            </Accordion>
          </Col>
    </>)
}

export default FooterLinks;