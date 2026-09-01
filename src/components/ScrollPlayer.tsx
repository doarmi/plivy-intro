import { useEffect, useRef, useState } from 'react';

const TOTAL = 181;

export default function ScrollPlayer() {
    const [active, setActive] = useState(false);
    const [progress, setProgress] = useState(0);

    const startYRef = useRef(0);

    useEffect(() => {
        const clamp = (value: number) =>
            Math.max(0, Math.min(1, value));

        const updateProgress = () => {
            if (!active) return;

            const startY = startYRef.current;

            const pageEnd =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const availableScroll =
                Math.max(1, pageEnd - startY);

            const current =
                window.scrollY - startY;

            const nextProgress =
                clamp(current / availableScroll);

            setProgress(nextProgress);
        };

        const handlePlay = () => {
            startYRef.current = window.scrollY;

            setProgress(0);
            setActive(true);
        };

        window.addEventListener(
            'plivy-play',
            handlePlay
        );

        window.addEventListener(
            'scroll',
            updateProgress,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            updateProgress
        );

        return () => {
            window.removeEventListener(
                'plivy-play',
                handlePlay
            );

            window.removeEventListener(
                'scroll',
                updateProgress
            );

            window.removeEventListener(
                'resize',
                updateProgress
            );
        };
    }, [active]);

    if (!active) return null;

    const seconds =
        Math.round(progress * TOTAL);

    const time =
        `${String(Math.floor(seconds / 60)).padStart(2, '0')}:` +
        `${String(seconds % 60).padStart(2, '0')}`;

    return (
        <div className="scroll-player">
            <span>{time}</span>

            <div className="track">
                <i
                    style={{
                        width: `${progress * 100}%`
                    }}
                />
            </div>

            <span>03:01</span>
        </div>
    );
}