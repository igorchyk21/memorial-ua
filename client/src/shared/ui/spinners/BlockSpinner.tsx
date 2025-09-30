import { useTheme } from "next-themes";
import { Spinner } from "react-bootstrap";

interface Props {
    show?: boolean;
    borderRadius?: string;
}

const BlockSpinner = ({ show, borderRadius }: Props) => {
    const { resolvedTheme } = useTheme();

    if (!show) return null;

    // Вибір кольору фону в залежності від теми
    const background =
    resolvedTheme === "dark"
        ? "rgba(33, 37, 41, 0.8)" // темний фон (Cartzilla dark ~ #212529)
        : "rgba(255, 255, 255, 0.6)"; // світлий фон (Cartzilla light ~ #fff)

    return (
        <div
            className="position-absolute top-0 start-0 w-100 h-100 block-spinner-container"
            style={{
            borderRadius,
            zIndex: 99,
            background,
            cursor: "not-allowed",
            pointerEvents: "all", // блокує кліки
            }}>
            <div className="w-100 h-100 d-flex">
            <Spinner className="m-auto" 
                variant={resolvedTheme === 'dark' ? 'white' : 'primary'}/>
            </div>
        </div>
    );
};

    export default BlockSpinner;
