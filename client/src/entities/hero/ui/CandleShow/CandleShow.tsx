import { memo, useMemo } from "react";

interface Props {
    maxWidth?: number;
    onClick?: () => void;
    expiries?: boolean;
}

const CandleShow = memo(({ maxWidth = 999, onClick, expiries = false }: Props) => {
    const isSmall = maxWidth <= 0;

    const style = useMemo(() => ({
        opacity: expiries ? 0.5 : 1,
        filter: expiries ? "grayscale(100%)" : "none",
        cursor: onClick ? "pointer" : "default",
    }), [expiries, onClick]);

    return (
        <div className="d-flex justify-content-center" style={style} onClick={onClick}>
            <img
                src={`/memorial/candle-${isSmall ? "small" : "trans"}.gif`}
                alt="candle"
                width={maxWidth > 0 ? maxWidth : undefined}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
});

export default CandleShow;
