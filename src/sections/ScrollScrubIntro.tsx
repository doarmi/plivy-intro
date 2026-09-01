import { useEffect, useRef } from 'react';

export default function ScrollScrubIntro() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const uiRef = useRef<HTMLDivElement | null>(null);
    const watermarkRef = useRef<HTMLDivElement | null>(null);

    const textOneRef = useRef<HTMLDivElement | null>(null);
    const textTwoRef = useRef<HTMLDivElement | null>(null);
    const textThreeRef = useRef<HTMLDivElement | null>(null);
    const textFourRef = useRef<HTMLDivElement | null>(null);
    const brandRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        const media = mediaRef.current;
        const image = imageRef.current;
        const ui = uiRef.current;
        const watermark = watermarkRef.current;

        const textOne = textOneRef.current;
        const textTwo = textTwoRef.current;
        const textThree = textThreeRef.current;
        const textFour = textFourRef.current;
        const brand = brandRef.current;

        if (
            !section ||
            !video ||
            !media ||
            !image ||
            !ui ||
            !watermark ||
            !textOne ||
            !textTwo ||
            !textThree ||
            !textFour ||
            !brand
        ) {
            return;
        }

        let duration = 0;
        let raf = 0;

        const clamp = (value: number, min = 0, max = 1) =>
            Math.min(max, Math.max(min, value));

        const sceneOpacity = (
            progress: number,
            start: number,
            peakStart: number,
            peakEnd: number,
            end: number
        ) => {
            if (progress < start || progress > end) return 0;

            if (progress < peakStart) {
                return clamp(
                    (progress - start) /
                    (peakStart - start)
                );
            }

            if (progress <= peakEnd) {
                return 1;
            }

            return 1 - clamp(
                (progress - peakEnd) /
                (end - peakEnd)
            );
        };

        const update = () => {
            const rect = section.getBoundingClientRect();

            const scrollable =
                section.offsetHeight -
                window.innerHeight;

            const progress = clamp(
                -rect.top /
                Math.max(1, scrollable)
            );

            /* =========================
               VIDEO SCRUB
               0 ~ 58%
            ========================= */

            const videoProgress = clamp(
                progress / 0.58
            );

            if (
                duration > 0 &&
                video.readyState >= 2 &&
                Number.isFinite(duration)
            ) {
                const targetTime =
                    videoProgress * duration;

                if (
                    Math.abs(
                        video.currentTime -
                        targetTime
                    ) > 0.025
                ) {
                    try {
                        video.currentTime =
                            targetTime;
                    } catch {
                        // seek 준비 전이면 다음 프레임 재시도
                    }
                }
            }

            /* =========================
               VIDEO ZOOM
            ========================= */

            const videoZoom = clamp(
                (progress - 0.45) / 0.15
            );

            const mediaScale =
                1 + videoZoom * 0.05;

            media.style.transform =
                `scale(${mediaScale})`;

            /* =========================
               C IMAGE
               56 ~ 72%
            ========================= */

            const cAppear = clamp(
                (progress - 0.56) / 0.16
            );

            image.style.opacity =
                String(cAppear);

            /* =========================
               C IMAGE ZOOM
               64 ~ 88%
            ========================= */

            const cZoom = clamp(
                (progress - 0.64) / 0.24
            );

            image.style.transform =
                `scale(${1.02 +
                cZoom * 1.28
                })`;

            /* =========================
               VIDEO FADE
            ========================= */

            const videoFade = clamp(
                (progress - 0.58) / 0.12
            );

            video.style.opacity =
                String(
                    1 - videoFade
                );

            /* =========================
               WATERMARK COVER
            ========================= */

            const badgeFade = clamp(
                (progress - 0.55) / 0.12
            );

            watermark.style.opacity =
                String(
                    1 - badgeFade
                );

            /* =========================
               TEXT SCENE 01
               좌측 상단
            ========================= */

            const sceneOne =
                sceneOpacity(
                    progress,
                    0.02,
                    0.07,
                    0.15,
                    0.22
                );

            textOne.style.opacity =
                String(sceneOne);

            textOne.style.transform =
                `
                translate3d(
                    ${-28 + sceneOne * 28}px,
                    ${18 - sceneOne * 18}px,
                    0
                )
                `;

            /* =========================
               TEXT SCENE 02
               우측 중앙
            ========================= */

            const sceneTwo =
                sceneOpacity(
                    progress,
                    0.18,
                    0.24,
                    0.32,
                    0.40
                );

            textTwo.style.opacity =
                String(sceneTwo);

            textTwo.style.transform =
                `
                translate3d(
                    ${36 - sceneTwo * 36}px,
                    0,
                    0
                )
                scale(${0.95 + sceneTwo * 0.05})
                `;

            textTwo.style.filter =
                `blur(${(1 - sceneTwo) * 12}px)`;

            /* =========================
               TEXT SCENE 03
               좌측 하단
            ========================= */

            const sceneThree =
                sceneOpacity(
                    progress,
                    0.36,
                    0.42,
                    0.50,
                    0.57
                );

            textThree.style.opacity =
                String(sceneThree);

            textThree.style.transform =
                `
                translate3d(
                    0,
                    ${28 - sceneThree * 28}px,
                    0
                )
                `;

            textThree.style.letterSpacing =
                `${0.12 - sceneThree * 0.08}em`;

            /* =========================
               TEXT SCENE 04
               우측 크게
            ========================= */

            const sceneFour =
                sceneOpacity(
                    progress,
                    0.52,
                    0.58,
                    0.67,
                    0.74
                );

            textFour.style.opacity =
                String(sceneFour);

            textFour.style.transform =
                `
                translate3d(
                    0,
                    ${18 - sceneFour * 18}px,
                    0
                )
                scale(${0.92 + sceneFour * 0.08})
                `;

            textFour.style.filter =
                `blur(${(1 - sceneFour) * 8}px)`;

            /* =========================
               PLIVY BRAND
            ========================= */

            const brandScene =
                sceneOpacity(
                    progress,
                    0.69,
                    0.74,
                    0.81,
                    0.88
                );

            brand.style.opacity =
                String(brandScene);

            brand.style.transform =
                `
                translate(-50%, -50%)
                scale(${0.85 + brandScene * 0.15})
                `;

            brand.style.letterSpacing =
                `${0.18 - brandScene * 0.09}em`;

            /* =========================
               REAL DOM UI
               87 ~ 100%
            ========================= */

            const uiProgress = clamp(
                (progress - 0.87) / 0.13
            );

            image.style.opacity =
                String(
                    cAppear *
                    (1 - uiProgress)
                );

            ui.style.opacity =
                String(uiProgress);

            ui.style.transform =
                `scale(${1.025 -
                uiProgress * 0.025
                })`;

            raf =
                requestAnimationFrame(
                    update
                );
        };

        const onLoadedMetadata = () => {
            duration =
                video.duration || 0;

            video.pause();

            if (duration > 0) {
                try {
                    video.currentTime =
                        0.001;
                } catch {
                    // ignore
                }
            }
        };

        video.addEventListener(
            'loadedmetadata',
            onLoadedMetadata
        );

        video.load();

        if (video.readyState >= 1) {
            duration =
                video.duration || 0;
        }

        raf =
            requestAnimationFrame(
                update
            );

        return () => {
            cancelAnimationFrame(raf);

            video.removeEventListener(
                'loadedmetadata',
                onLoadedMetadata
            );
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="scrub-intro"
            id="about"
        >
            <div className="scrub-sticky">

                <div
                    ref={mediaRef}
                    className="scrub-media"
                >
                    <video
                        ref={videoRef}
                        className="scrub-video"
                        src="/scrub/plivy-intro-AB.mp4"
                        poster="/scrub/plivy-intro-A.webp"
                        muted
                        playsInline
                        preload="auto"
                    />

                    <img
                        ref={imageRef}
                        className="scrub-c-image"
                        src="/scrub/plivy-intro-C.webp"
                        alt=""
                    />
                </div>

                <div className="scrub-copy-layer">

                    <div
                        ref={textOneRef}
                        className="scrub-copy scrub-copy-one"
                    >
                        음악은 지나가도
                    </div>

                    <div
                        ref={textTwoRef}
                        className="scrub-copy scrub-copy-two"
                    >
                        그 순간은 남으니까
                    </div>

                    <div
                        ref={textThreeRef}
                        className="scrub-copy scrub-copy-three"
                    >
                        듣고 기록하고
                    </div>

                    <div
                        ref={textFourRef}
                        className="scrub-copy scrub-copy-four"
                    >
                        다시 발견하는 음악
                    </div>

                    <div
                        ref={brandRef}
                        className="scrub-copy-brand"
                    >
                        PLIVY
                    </div>

                </div>

                <div
                    ref={watermarkRef}
                    className="scrub-watermark-cover"
                >
                    <span>PLIVY</span>
                </div>

                <div
                    ref={uiRef}
                    className="scrub-app-ui"
                >
                    <div className="scrub-app-shell">

                        <div className="scrub-app-top">
                            <strong>PLIVY.</strong>
                            <span>•••</span>
                        </div>

                        <p className="scrub-app-label">
                            NOW PLAYING
                        </p>

                        <h1>
                            Honest
                        </h1>

                        <p className="scrub-artist">
                            NOTD & Lou Elliotte
                        </p>

                        <div className="scrub-album-placeholder">
                            <img
                                src="/assets/honest.jpg"
                                alt="Honest - NOTD & Lou Elliotte"
                            />

                        </div>

                        <div className="scrub-controls">

                            <button
                                type="button"
                                className="scrub-side-control"
                                aria-label="Previous"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M15 5L8 12L15 19" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="scrub-main-play"
                                aria-label="Play"
                            >
                                <svg
                                    className="scrub-play-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8 5L19 12L8 19Z" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                className="scrub-side-control"
                                aria-label="Next"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M9 5L16 12L9 19" />
                                </svg>
                            </button>

                        </div>

                        <div className="scrub-record-preview">

                            <p>
                                RECENT RECORDS
                            </p>

                            <div className="scrub-record-card">

                                <img
                                    src="/assets/record-hangang-user.jpg"
                                    alt="PLIVY record"
                                />

                                <div>
                                    <small>
                                        TODAY
                                    </small>

                                    <strong>
                                        한강 산책
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="scrub-scroll-guide">
                    SCROLL
                    <span>↓</span>
                </div>

            </div>
        </section >
    );
}