import Image from "next/image";
import { memo, useMemo } from "react";

interface Props {
    maxWidth?: number;
    onClick?: () => void;
    expiries?: boolean;
    offeringType?: "candle" | "flower";
}

const CandleShow = memo(({ maxWidth = 999, onClick, expiries = false, offeringType = "candle" }: Props) => {
    const isSmall = maxWidth <= 0;

    const style = useMemo(() => ({
        opacity: expiries ? 0.5 : 1,
        filter: expiries ? "grayscale(100%)" : "none",
        cursor: onClick ? "pointer" : "default",
    }), [expiries, onClick]);

    return (
        <div className="d-flex justify-content-center" style={style} onClick={onClick}>
        <Image
            src={offeringType === "flower" ? "/memorial/flower.webp" : `/memorial/candle-${isSmall ? "small" : "trans"}.gif`}
            alt={offeringType}
            width={maxWidth > 0 ? maxWidth : undefined}
            height={maxWidth > 0 ? maxWidth : undefined}
            sizes={offeringType === "flower" && maxWidth > 0 ? `${maxWidth}px` : undefined}
            loading="lazy"
            decoding="async"
            unoptimized={offeringType === "candle"}
        />
        </div>
    );
});
  
CandleShow.displayName = "CandleShow";
  
export default CandleShow;
