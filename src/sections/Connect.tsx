import { useEffect, useRef } from 'react';

const stories = [
    {
        className: 'connect-story-one',
        place: '퇴근길 차 안',
        time: '6:42 PM',
        text: '하루가 길었던 날,\n집 가는 길에 계속 반복해서 들었다.',
        tag: '#퇴근길',
    },
    {
        className: 'connect-story-two',
        place: '여행 중 거리',
        time: '3:18 PM',
        text: '처음 걷는 거리인데\n이상하게 익숙하게 느껴졌던 순간.',
        tag: '#여행',
    },
    {
        className: 'connect-story-three',
        place: '늦은 밤 산책',
        time: '11:27 PM',
        text: '조용한 밤에 들으니까\n낮이랑 전혀 다른 노래처럼 들렸다.',
        tag: '#밤산책',
    },
];

export default function Connect() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                section.classList.add('connect-visible');
                observer.disconnect();
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section connect"
        >
            <div className="connect-glow" />

            <div className="connect-copy">
                <p className="eyebrow">
                    CONNECT
                </p>

                <h2>
                    같은 음악
                    <br />
                    서로 다른 이야기.
                </h2>

                <p className="connect-description">
                    하나의 노래에 담긴 서로 다른 순간을
                    <br />
                    만나보세요.
                </p>
            </div>

            <div className="connect-network">

                <svg
                    className="connect-lines"
                    viewBox="0 0 1200 650"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        className="connect-line connect-line-one"
                        d="M600 325 C470 280 385 185 255 165"
                    />

                    <path
                        className="connect-line connect-line-two"
                        d="M600 325 C755 265 825 170 955 155"
                    />

                    <path
                        className="connect-line connect-line-three"
                        d="M600 325 C625 435 720 505 840 535"
                    />
                </svg>

                <article className="connect-center-card">
                    <div className="connect-center-cover">
                        <img
                            src="/assets/honest.jpg"
                            alt="Honest - NOTD & Lou Elliotte"
                        />
                    </div>

                    <div className="connect-center-info">
                        <small>
                            CONNECTED BY
                        </small>

                        <strong>
                            Honest
                        </strong>

                        <p>
                            NOTD & Lou Elliotte
                        </p>

                        <span className="connect-count">
                            24 STORIES
                        </span>
                    </div>
                </article>

                {stories.map((story) => (
                    <article
                        key={story.place}
                        className={`connect-story ${story.className}`}
                    >
                        <div className="connect-story-top">
                            <div className="connect-avatar">
                                <span />
                            </div>

                            <div>
                                <strong>
                                    {story.place}
                                </strong>

                                <small>
                                    {story.time}
                                </small>
                            </div>
                        </div>

                        <p>
                            {story.text.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index === 0 && <br />}
                                </span>
                            ))}
                        </p>

                        <div className="connect-story-bottom">
                            <span>
                                {story.tag}
                            </span>

                            <b>
                                ♡
                            </b>
                        </div>
                    </article>
                ))}

            </div>

            <p className="connect-bottom-copy">
                한 곡에서 시작된 이야기가
                <span> 새로운 취향으로 이어집니다.</span>
            </p>
        </section>
    );
}