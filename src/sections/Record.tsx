export default function Record() {
    return (
        <section className="section split record-section">
            <div className="record-copy">
                <p className="eyebrow">RECORD</p>

                <h2>
                    듣는 순간을
                    <br />
                    기록하세요.
                </h2>

                <p className="record-description">
                    음악과 함께한 오늘의 순간을
                    <br />
                    PLIVY에 남겨보세요.
                </p>

                <div className="record-meta-list">
                    <span>#산책</span>
                    <span>#한강</span>
                    <span>#저녁</span>
                </div>
            </div>

            <article className="record-card record-card-new">
                <div className="record-card-top">
                    <div>
                        <small>NOW PLAYING</small>
                        <strong>Honest</strong>
                        <span>NOTD & Lou Elliotte</span>
                    </div>

                    <div className="record-cover-mini">
                        <img
                            src="/assets/honest.jpg"
                            alt="Honest"
                        />
                    </div>
                </div>

                <div className="record-photo-wrap">
                    <img
                        src="/assets/record-hangang-user.jpg"
                        alt="한강에서 남긴 PLIVY 음악 기록"
                    />

                    <span className="record-date">
                        SEP 01 · 8:14 PM
                    </span>
                </div>

                <div className="record-card-body">
                    <p className="record-place">
                        한강 산책
                    </p>

                    <p className="record-note">
                        오늘은 괜히 오래 걷고 싶었던 날.
                        <br />
                        이 노래가 생각보다 잘 어울렸다.
                    </p>

                    <div className="record-card-bottom">
                        <div className="record-tags">
                            <span>#산책</span>
                            <span>#저녁</span>
                        </div>

                        <span className="record-heart">
                            ♡ 24
                        </span>
                    </div>
                </div>
            </article>
        </section>
    );
}