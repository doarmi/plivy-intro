import { useEffect, useRef, useState } from 'react';

export default function NowPlaying() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showScrollGuide, setShowScrollGuide] = useState(false);

    const canHideGuideRef = useRef(false);
    const guideTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!showScrollGuide) return;
            if (!canHideGuideRef.current) return;

            setShowScrollGuide(false);
            canHideGuideRef.current = false;
        };

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showScrollGuide]);

    useEffect(() => {
        return () => {
            if (guideTimerRef.current !== null) {
                window.clearTimeout(guideTimerRef.current);
            }
        };
    }, []);

    const handlePlay = () => {
        setIsPlaying((prev) => {
            const next = !prev;

            if (next) {
                setShowScrollGuide(true);

                canHideGuideRef.current = false;

                if (guideTimerRef.current !== null) {
                    window.clearTimeout(guideTimerRef.current);
                }

                guideTimerRef.current = window.setTimeout(() => {
                    canHideGuideRef.current = true;
                }, 2000);

                window.dispatchEvent(
                    new Event('plivy-play')
                );
            } else {
                setShowScrollGuide(false);

                canHideGuideRef.current = false;

                if (guideTimerRef.current !== null) {
                    window.clearTimeout(guideTimerRef.current);
                    guideTimerRef.current = null;
                }
            }

            return next;
        });
    };

    return (
        <section
            className={`section now ${isPlaying ? 'is-playing' : ''}`}
            id="experience"
        >
            <div className="now-glow" />

            <div className="now-content">
                <p className="eyebrow">
                    NOW PLAYING
                </p>

                <h2>
                    Honest
                </h2>

                <p className="now-artist">
                    NOTD & Lou Elliotte
                </p>

                <div className="now-album-wrap">
                    <div className="now-album">

                        <div className="now-album-art">
                            <img
                                src="/assets/honest.jpg"
                                alt="Honest - NOTD & Lou Elliotte"
                            />
                        </div>

                        <div className="now-album-shadow" />

                    </div>
                </div>

                <div className="now-progress">

                    <div className="now-progress-track">
                        <span />
                    </div>

                    <div className="now-times">
                        <span>0:00</span>
                        <span>3:01</span>
                    </div>

                </div>

                <div className="now-controls">

                    <button
                        type="button"
                        className="now-side-control"
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <button
                        type="button"
                        className="now-play-button"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        onClick={handlePlay}
                    >
                        {isPlaying ? (
                            <span className="pause-icon">
                                <i />
                                <i />
                            </span>
                        ) : (
                            <span className="play-icon">
                                ▶
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        className="now-side-control"
                        aria-label="Next"
                    >
                        ›
                    </button>

                </div>

                <div
                    className={`listen-guide ${isPlaying
                            ? showScrollGuide
                                ? 'visible is-playing'
                                : 'is-playing'
                            : 'visible'
                        }`}
                >
                    <span>
                        {isPlaying
                            ? 'SCROLL TO LISTEN'
                            : 'PLAY TO START'}
                    </span>

                    <b>
                        ↓
                    </b>
                </div>

            </div>
        </section>
    );
}