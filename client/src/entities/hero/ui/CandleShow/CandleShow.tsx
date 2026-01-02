interface Props {
    maxWidth?:number;
}

const CandleShow = ({maxWidth}:Props) => {
    return (
        <div className="d-flex justify-content-center" style={{maxWidth:maxWidth}}>
            <img src="/memorial/candle-trans.gif" alt="candle" />
        </div>
    )
}

export default CandleShow;