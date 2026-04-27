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
    /** Full block: title, form/burning copy, expiry, small image. When false, tabs stay; active offering still shows burning caption + expiry below tabs. */
    showTitleBlock?: boolean;
}

/** Display height for header candle / flower; width follows intrinsic aspect ratio. */
const HEADER_OFFERING_IMG_PX = 64;

const CandleLightHeader = ({
    offeringType,
    onOfferingTypeChange,
    activeTab,
    candleExpiries,
    showTitleBlock = true
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
                    <Nav.Link eventKey="flower" role="tab" className="px-4">
                        {t("hero.candle.titleFlower")}
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {!showTitleBlock && activeTab === "candle" && (
                <div className="mb-3">
                    <p
                        className="mb-0 fs-14 text-secondary"
                        style={{ lineHeight: 1.35 }}
                    >
                        {offeringType === "flower"
                            ? t("hero.candle.flowerDescription")
                            : t("hero.candle.candleBurningDescription")}
                    </p>
                    <p className="mb-0 mt-2">
                        {t("hero.candle.candleExpiries")}{" "}
                        {DT.fromMillis(candleExpiries || 0)
                            .setLocale("uk")
                            .toLocaleString(DT.DATETIME_MED)}
                    </p>
                </div>
            )}

            {showTitleBlock && (
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
                                </>
                            )}
                            {activeTab === "candle" && (
                                <p className="mb-0 mt-2">
                                    {t("hero.candle.candleExpiries")}{" "}
                                    {DT.fromMillis(candleExpiries || 0)
                                        .setLocale("uk")
                                        .toLocaleString(DT.DATETIME_MED)}
                                </p>
                            )}
                        </div>
                        {offeringType === "candle" ? (
                            <Image
                                className="flex-shrink-0"
                                width={280}
                                height={407}
                                src="/memorial/candle-trans.gif"
                                style={{
                                    height: HEADER_OFFERING_IMG_PX,
                                    width: "auto"
                                }}
                                unoptimized
                                alt=""
                            />
                        ) : (
                            <Image
                                className="flex-shrink-0"
                                width={1005}
                                height={1104}
                                src="/memorial/flower.webp"
                                style={{
                                    height: HEADER_OFFERING_IMG_PX,
                                    width: "auto"
                                }}
                                alt=""
                                sizes={`${Math.round(HEADER_OFFERING_IMG_PX * (1005 / 1104))}px`}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CandleLightHeader;
