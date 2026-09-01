import { useEffect, useRef } from 'react';

const tracks = [
    {
        title: 'Honest',
        artist: 'NOTD & Lou Elliotte',
        tag: 'POP',
        cover: '/assets/honest.jpg',
    },
    {
        title: '거꾸로 피는 꽃',
        artist: '루미너스데이',
        tag: 'INDIE',
        cover: '/assets/blooming-down.jpg',
    },
    {
        title: '404',
        artist: 'KiiiKiii',
        tag: 'K-POP',
        cover: '/assets/kiikii-404.jpg',
    },
    {
        title: 'Silver Sable',
        artist: 'Cigarettes After Sex',
        tag: 'DREAM POP',
        cover: '/assets/silver-sable.jpg',
    },
    {
        title: 'Hype Boy',
        artist: 'NewJeans',
        tag: 'K-POP',
        cover: '/assets/hype-boy.jpg',
    },
    {
        title: 'Summer',
        artist: 'H1-KEY',
        tag: 'POP',
        cover: '/assets/h1key-summer.jpg',
    },
];

export default function Discover() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const cards = Array.from(
            section.querySelectorAll<HTMLElement>('.discover-card')
        );

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                section.classList.add('discover-visible');

                cards.forEach((card, index) => {
                    window.setTimeout(() => {
                        card.classList.add('discover-card-visible');
                    }, index * 90);
                });

                observer.disconnect();
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section discover"
        >
            <div className="discover-glow discover-glow-one" />
            <div className="discover-glow discover-glow-two" />

            <div className="discover-copy">
                <p className="eyebrow">
                    DISCOVER
                </p>

                <h2>
                    새로운 음악과
                    <br />
                    취향을 발견하세요
                </h2>

                <p className="discover-description">
                    다른 사람의 기록을 따라가다 보면
                    <br />
                    예상하지 못한 음악을 만나게 됩니다
                </p>
            </div>

            <div className="discover-stage">
                {tracks.map((track, index) => (
                    <article
                        key={`${track.title}-${index}`}
                        className={`discover-card discover-card-${index + 1}`}
                    >
                        <div className="discover-cover">
                            <img
                                src={track.cover}
                                alt={`${track.title} - ${track.artist}`}
                            />
                        </div>

                        <div className="discover-card-info">
                            <small>
                                {track.tag}
                            </small>

                            <strong>
                                {track.title}
                            </strong>

                            <p>
                                {track.artist}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="discover-card-button"
                            aria-label={`${track.title} 보기`}
                        >
                            ↗
                        </button>
                    </article>
                ))}
            </div>

            <p className="discover-hint">
                HOVER TO EXPLORE
            </p>
        </section>
    );
}