export default function FinalCTA() {
    return (
        <section
            className="section final final-section"
            id="start"
        >
            <div className="final-glow final-glow-one" />
            <div className="final-glow final-glow-two" />

            <div className="final-content">
                <p className="eyebrow">
                    START WITH PLIVY
                </p>

                <h2>
                    당신의 음악에는
                    <br />
                    어떤 이야기가 있나요?
                </h2>

                <p className="final-description">
                    음악과 함께한 순간을
                    <br />
                    PLIVY에 남겨보세요
                </p>

                <div className="final-action">
                    <div className="final-qr-card">
                        <div className="final-qr">
                            <span>QR</span>
                        </div>
                        <a
                            href="https://plivy-jzov.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="final-qr"
                            aria-label="PLIVY 열기"
                        >
                            <img
                                src="/assets/plivy-qr.png"
                                alt="PLIVY QR 코드"
                            />
                        </a>
                    </div>

                    <a
                        href="https://plivy-jzov.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="final-open-button"
                    >
                        PLIVY 열기
                        <span>→</span>
                    </a>
                </div>
            </div>

            <footer className="final-footer">
                PLIVY © 2026
            </footer>
        </section>
    );
}