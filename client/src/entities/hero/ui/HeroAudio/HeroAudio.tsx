import conf from "@/shared/config/conf";

interface Props {
    audioUrl:string;
    heroName?:string;
}

const HeroAudio = ({audioUrl, heroName}:Props) => {
    if (!audioUrl)
        return (<span className="text-muted small">{heroName}</span>);

    const isAbsolute = /^https?:\/\//i.test(audioUrl);
    const src = isAbsolute ? audioUrl : `${conf.dataUrl}/${audioUrl}`;

    return (
        <audio
            controls
            style={{width:"100%"}}
            src={src}>
            {heroName}
        </audio>
    );
}

export default HeroAudio;


