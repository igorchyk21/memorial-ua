import conf from "@/shared/config/conf";
import { parseYouTubeUrl } from "@/shared/helper/videFunctions/parseYouTubeUrl";

interface Props {
    videoUrl:string;
    showSpinner:boolean;
    heroName?:string;
}

const HeroVideo = ({videoUrl, showSpinner, heroName}:Props) => {
    return (<>
        {videoUrl ? (
            (() => {
                const { valid, embedUrl } = parseYouTubeUrl(
                    videoUrl as string
                );
                return valid && embedUrl ? (
                    <iframe
                        src={embedUrl}
                        title={heroName || "YouTube video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{
                            border: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                ) : (
                    <video
                        src={`${conf.dataUrl}/${videoUrl}`}
                        controls
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                );
            })()
        ) : (
            <span className="text-muted small">
                {heroName}
            </span>
        )}
    </>)
}

export default HeroVideo;