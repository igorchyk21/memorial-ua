"use client";

import { useTranslations } from "next-intl";
import { Nav } from "react-bootstrap";
import Image from "next/image";
import { DateTime as DT } from "luxon";

export type OfferingKind = "candle" | "flower";

interface Props {
    offeringType: OfferingKind;
    onOfferingTypeChange: (k: OfferingKind) => void;
    activeTab: "form" | "candle" | null;
    candleExpiries: number | null;
}

const CandleLightHeader = ({
    offeringType,
    onOfferingTypeChange,
    activeTab,
    candleExpiries
}: Props) => {
    const t = useTranslations();

    const titleKey =
        offeringType === "flower"
            ? "titleFlower"
            : activeTab === "candle"
              ? "candleBurning"
              : "title";

    return (
        <>
            <Nav
                variant="tabs"
                className="mb-3"
                activeKey={offeringType}
                onSelect={(k) => {
                    if (k === "candle" || k === "flower") onOfferingTypeChange(k);
                }}
            >
                <Nav.Item>
                    <Nav.Link eventKey="candle" role="tab">
                        {t("hero.candle.title")}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="flower" role="tab">
                        {t("hero.candle.titleFlower")}
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div className="mb-3">
                <div className="d-flex align-items-end gap-3">
                    <div className="flex-grow-1 min-w-0">
                        <h5 className="mb-0">{t(`hero.candle.${titleKey}`)}</h5>
                        {offeringType === "flower" && (
                            <p
                                className="mb-0 fs-14 mt-2 text-secondary"
                                style={{ lineHeight: 1.35 }}
                            >
                                {t("hero.candle.flowerDescription")}
                            </p>
                        )}
                        {offeringType === "candle" && activeTab === "form" && (
                            <p
                                className="mb-0 fs-14 mt-2 text-secondary"
                                style={{ lineHeight: 1.35 }}
                            >
                                {t("hero.candle.candleFormDescription")}
                            </p>
                        )}
                        {offeringType === "candle" && activeTab === "candle" && (
                            <>
                                <p
                                    className="mb-0 fs-14 mt-2 text-secondary"
                                    style={{ lineHeight: 1.35 }}
                                >
                                    {t("hero.candle.candleBurningDescription")}
                                </p>
                                <p className="mb-0 mt-2">
                                    {t("hero.candle.candleExpiries")}{" "}
                                    {DT.fromMillis(candleExpiries || 0)
                                        .setLocale("uk")
                                        .toLocaleString(DT.DATETIME_MED)}
                                </p>
                            </>
                        )}
                    </div>
                    {offeringType === "candle" ? (
                        <Image
                            className="flex-shrink-0"
                            width={64}
                            height={64}
                            src="/memorial/candle-trans.gif"
                            unoptimized
                            alt=""
                        />
                    ) : (
                        <Image
                            className="flex-shrink-0"
                            width={64}
                            height={64}
                            src="/memorial/flower.webp"
                            alt=""
                            sizes="64px"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CandleLightHeader;
