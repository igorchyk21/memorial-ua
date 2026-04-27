"use client"
import { useState } from "react";
import { Nav, TabPane, Tabs } from "react-bootstrap";
import { useAuth } from "@/shared/context/Auth/model/useAuth";
import { Formik } from "formik";
import { HeroCandleDataType } from "@global/types";
import CandleLightForm from "./CandleLightForm";
import useCandleLight from "../model/useCandleLight";
import BaseSpinner from "@/shared/ui/spinners/BaseSpinner";
import { CandleShow } from "@/entities/hero";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";
import CandleLightHeader, { type OfferingKind } from "./CandleLightHeader";

interface Props {
    heroId: number;
    heroName: string;
}
const CandleLight = ({ heroId, heroName }: Props) => {
    const { auth } = useAuth();
    const [offeringType, setOfferingType] = useState<OfferingKind>("candle");
    const { setHeroCandlesListShow } = useGlobal();
    const { handleSubmit, activeTab, setActiveTab, candleExpiries, wfpHtml, wfpContainerRef } = useCandleLight(heroId);

    return (
        <div
            className="border rounded-4 py-4 px-4 mb-4"
            style={{ position: "sticky", top: 190 }}
        >
            <CandleLightHeader
                offeringType={offeringType}
                onOfferingTypeChange={setOfferingType}
                activeTab={activeTab}
                candleExpiries={candleExpiries}
            />

            {wfpHtml && <div ref={wfpContainerRef} className="w-100 d-block" />}

            {activeTab !== null ? (
                <Tabs
                    activeKey={activeTab}
                    className="d-none"
                    onSelect={(key) => setActiveTab(key as "form" | "candle")}
                >
                    <TabPane eventKey="form" title="form">
                        <Formik<HeroCandleDataType>
                            initialValues={{
                                userId: auth?.user.ID || 0,
                                userName: auth?.user.userName || "",
                                days: 1,
                                price: 0,
                                comment: ""
                            }}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => <CandleLightForm disabled={!!wfpHtml} formik={formik} />}
                        </Formik>
                    </TabPane>

                    <TabPane className="py-4" eventKey="candle" title="candle">
                        <CandleShow
                            maxWidth={200}
                            onClick={() => setHeroCandlesListShow({ id: heroId, name: heroName })}
                        />
                    </TabPane>
                </Tabs>
            ) : (
                <BaseSpinner show={true} />
            )}
        </div>
    );
};

export default CandleLight;
