"use client"

const HeroCardFlower2 = () => {
    return (
        <>
            <div
                className="position-absolute hero-card-flower-wrap"
                style={{
                    bottom: -5,
                    left: 0,
                    zIndex: 4,
                    width: "auto",
                    height: "150px",
                }}
            >
                <div className="hero-card-flower-hover">
                    <img
                        src="/memorial/flower-2.webp"
                        alt=""
                        aria-hidden="true"
                        className="hero-card-flower"
                        style={{
                            width: "auto",
                            height: "150px",
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
                .hero-card-flower {
                    pointer-events: none;
                    transform-origin: 18% 98%;
                    animation: flowerStillSway 7.4s ease-in-out infinite, flowerColorBreath 9.8s ease-in-out infinite;
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
                    transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease;
                }

                :global(.hero:hover) .hero-card-flower-hover {
                    transform: scale(1.02);
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
                    pointer-events: none;
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

                @keyframes flowerStillSway {
                    0%,
                    100% {
                        transform: translate3d(0, 0, 0) rotate(-0.35deg) scale(1);
                    }
                    35% {
                        transform: translate3d(1px, -0.5px, 0) rotate(0.55deg) scale(1.01);
                    }
                    65% {
                        transform: translate3d(-1px, 0.4px, 0) rotate(-0.7deg) scale(0.997);
                    }
                }

                @keyframes flowerColorBreath {
                    0%,
                    100% {
                        filter: brightness(1) saturate(1);
                    }
                    45% {
                        filter: brightness(1.04) saturate(1.06);
                    }
                    72% {
                        filter: brightness(0.99) saturate(0.98);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-card-flower {
                        animation: none;
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

export default HeroCardFlower2
