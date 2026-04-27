"use client"

interface Props {
    heroId:number;
}

const HeroCardFlower = ({heroId}:Props) => {
    const flowerTrack = heroId % 3;
    const flowerDuration = 5.8 + (heroId % 5) * 0.5;
    const flowerDelay = -((heroId % 7) * 0.6);
    const flowerGustDuration = 11.5 + (heroId % 4) * 1.2;
    const flowerGustDelay = -((heroId % 9) * 0.75);
    const flowerAnimationName = ["flowerWindA", "flowerWindB", "flowerWindC"][flowerTrack];

    return (
        <>
            <div
                className="position-absolute hero-card-flower-wrap"
                style={{
                    bottom: -30,
                    left: 50,
                    zIndex: 2,
                    width: "auto",
                    height: "150px",
                    animation: `flowerGust ${flowerGustDuration}s cubic-bezier(0.35, 0, 0.2, 1) ${flowerGustDelay}s infinite`
                }}
            >
                <div className="hero-card-flower-hover">
                    <img
                        src="/memorial/flower.webp"
                        alt=""
                        aria-hidden="true"
                        className="hero-card-flower"
                        style={{
                            width: "auto",
                            height: "150px",
                            animation: `${flowerAnimationName} ${flowerDuration}s cubic-bezier(0.42, 0, 0.2, 1) ${flowerDelay}s infinite, flowerGlow ${flowerDuration * 0.9}s ease-in-out ${flowerDelay}s infinite`
                        }}
                    />
                    <span className="hero-card-petal hero-card-petal-a" />
                    <span className="hero-card-petal hero-card-petal-b" />
                </div>
            </div>

            <style jsx>{`
                .hero-card-flower {
                    pointer-events: none;
                    transform-origin: 45% 95%;
                    will-change: transform, filter;
                }

                .hero-card-flower-wrap {
                    pointer-events: none;
                    overflow: visible;
                }

                .hero-card-flower-hover {
                    position: relative;
                    width: fit-content;
                    height: fit-content;
                    transform: rotate(25deg);
                    transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease;
                    will-change: transform, filter;
                }

                :global(.hero:hover) .hero-card-flower-hover {
                    transform: rotate(25deg) translate3d(0, -1px, 0) scale(1.014);
                    filter: brightness(1.03);
                }

                .hero-card-flower-wrap::after {
                    content: "";
                    position: absolute;
                    inset: -20% -35%;
                    background: linear-gradient(
                        105deg,
                        rgba(255, 255, 255, 0) 30%,
                        rgba(255, 245, 220, 0.18) 47%,
                        rgba(255, 255, 255, 0.22) 50%,
                        rgba(255, 245, 220, 0.18) 53%,
                        rgba(255, 255, 255, 0) 70%
                    );
                    transform: translateX(-140%) rotate(6deg);
                    mix-blend-mode: screen;
                    opacity: 0.65;
                    animation: flowerShimmer 8.5s ease-in-out infinite;
                }

                @keyframes flowerGlow {
                    0% {
                        filter: brightness(1) saturate(1) drop-shadow(0 0 0 rgba(255, 236, 194, 0));
                    }
                    45% {
                        filter: brightness(1.08) saturate(1.06) drop-shadow(0 0 6px rgba(255, 232, 184, 0.18));
                    }
                    100% {
                        filter: brightness(1) saturate(1) drop-shadow(0 0 0 rgba(255, 236, 194, 0));
                    }
                }

                @keyframes flowerShimmer {
                    0%,
                    62%,
                    100% {
                        transform: translateX(-140%) rotate(6deg);
                        opacity: 0;
                    }
                    72% {
                        opacity: 0.58;
                    }
                    84% {
                        transform: translateX(130%) rotate(6deg);
                        opacity: 0;
                    }
                }

                .hero-card-petal {
                    position: absolute;
                    border-radius: 50% 65% 50% 65%;
                    background: radial-gradient(circle at 35% 35%, rgba(255, 247, 231, 0.5) 0%, rgba(227, 198, 166, 0.22) 45%, rgba(227, 198, 166, 0) 100%);
                    pointer-events: none;
                    mix-blend-mode: screen;
                    opacity: 0;
                    will-change: transform, opacity;
                }

                .hero-card-petal-a {
                    width: 11px;
                    height: 8px;
                    left: 66px;
                    bottom: 116px;
                    animation: petalDriftA 9.5s ease-in-out infinite;
                }

                .hero-card-petal-b {
                    width: 8px;
                    height: 6px;
                    left: 82px;
                    bottom: 96px;
                    animation: petalDriftB 11.2s ease-in-out -2.4s infinite;
                }

                @keyframes petalDriftA {
                    0%,
                    58%,
                    100% {
                        transform: translate3d(0, 0, 0) rotate(-8deg) scale(0.95);
                        opacity: 0;
                    }
                    66% {
                        transform: translate3d(3px, -8px, 0) rotate(12deg) scale(1);
                        opacity: 0.2;
                    }
                    83% {
                        transform: translate3d(-2px, -18px, 0) rotate(30deg) scale(0.92);
                        opacity: 0.14;
                    }
                }

                @keyframes petalDriftB {
                    0%,
                    55%,
                    100% {
                        transform: translate3d(0, 0, 0) rotate(10deg) scale(0.9);
                        opacity: 0;
                    }
                    70% {
                        transform: translate3d(-4px, -11px, 0) rotate(-18deg) scale(1);
                        opacity: 0.18;
                    }
                    88% {
                        transform: translate3d(2px, -20px, 0) rotate(-36deg) scale(0.88);
                        opacity: 0.12;
                    }
                }

                @keyframes flowerGust {
                    0%,
                    52%,
                    100% {
                        transform: translate3d(0, 0, 0) rotate(0deg);
                    }
                    61% {
                        transform: translate3d(1px, -1px, 0) rotate(0.5deg);
                    }
                    69% {
                        transform: translate3d(-1.5px, -2px, 0) rotate(-0.8deg);
                    }
                    76% {
                        transform: translate3d(0.6px, -1px, 0) rotate(0.35deg);
                    }
                }

                @keyframes flowerWindA {
                    0% {
                        transform: translate3d(0, 0, 0) rotate(-3.4deg) scale(1);
                        filter: brightness(1);
                    }
                    20% {
                        transform: translate3d(1.5px, -4px, 0) rotate(2.2deg) scale(1.024);
                        filter: brightness(1.05);
                    }
                    45% {
                        transform: translate3d(-1.4px, -3px, 0) rotate(3.5deg) scale(1.04);
                        filter: brightness(1.08);
                    }
                    70% {
                        transform: translate3d(1.5px, -5px, 0) rotate(-1.3deg) scale(1.03);
                        filter: brightness(1.06);
                    }
                    100% {
                        transform: translate3d(0, 0, 0) rotate(-3.4deg) scale(1);
                        filter: brightness(1);
                    }
                }

                @keyframes flowerWindB {
                    0% {
                        transform: translate3d(0, 0, 0) rotate(2.8deg) scale(1);
                        filter: brightness(1);
                    }
                    18% {
                        transform: translate3d(-1.5px, -4px, 0) rotate(-1.9deg) scale(1.024);
                        filter: brightness(1.05);
                    }
                    36% {
                        transform: translate3d(1.4px, -5px, 0) rotate(4.1deg) scale(1.046);
                        filter: brightness(1.09);
                    }
                    62% {
                        transform: translate3d(-1.4px, -3px, 0) rotate(0deg) scale(1.024);
                        filter: brightness(1.05);
                    }
                    83% {
                        transform: translate3d(1.5px, -4px, 0) rotate(-2.4deg) scale(1.035);
                        filter: brightness(1.07);
                    }
                    100% {
                        transform: translate3d(0, 0, 0) rotate(2.8deg) scale(1);
                        filter: brightness(1);
                    }
                }

                @keyframes flowerWindC {
                    0% {
                        transform: translate3d(0, 0, 0) rotate(-2.4deg) scale(1);
                        filter: brightness(1);
                    }
                    22% {
                        transform: translate3d(1.4px, -3px, 0) rotate(1.1deg) scale(1.022);
                        filter: brightness(1.04);
                    }
                    47% {
                        transform: translate3d(-1.6px, -6px, 0) rotate(3.8deg) scale(1.048);
                        filter: brightness(1.09);
                    }
                    68% {
                        transform: translate3d(1.4px, -4px, 0) rotate(-1.1deg) scale(1.03);
                        filter: brightness(1.06);
                    }
                    100% {
                        transform: translate3d(0, 0, 0) rotate(-2.4deg) scale(1);
                        filter: brightness(1);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-card-flower {
                        animation: none;
                    }

                    .hero-card-flower-wrap {
                        animation: none !important;
                    }

                    .hero-card-petal {
                        animation: none;
                        opacity: 0;
                    }

                    .hero-card-flower-wrap::after {
                        animation: none;
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    )
}

export default HeroCardFlower;
