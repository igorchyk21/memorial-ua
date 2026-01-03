import { safeIntParse } from "../gim-beckend-helpers.js";

export interface DecodedReference {
    aRef: string[];   // масив частин референсу
    payType: string;  // тип платежу (meet, sub, selfmeet, media)
    candleId: number;   // ID свічки
    days: number;   // кількість днів
}

/**
 * Декодує референс WFP
 * @param ref - рядок виду "meet-123-45-678-1700000000"
 * @returns DecodedReference | false
 */
export const decodeReference = (ref: string): DecodedReference | null => {
    if (!ref) return null;

    const aRef = ref.split("-");
    if (!aRef || aRef.length === 0) return null;

    const payType = aRef[0];
    const candleId = safeIntParse(aRef?.[1], null);
    const days = safeIntParse(aRef?.[2], null);

    if (!candleId || !days) return null;

    return {
        aRef,
        payType,
        candleId,
        days
    };
};
