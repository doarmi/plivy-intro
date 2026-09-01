import ScrollPlayer from './components/ScrollPlayer';
import ScrollScrubIntro from './sections/ScrollScrubIntro';
import NowPlaying from './sections/NowPlaying';
import Record from './sections/Record';
import Discover from './sections/Discover';
import Connect from './sections/Connect';
import FinalCTA from './sections/FinalCTA';

export default function App() {
    return (
        <>
            <header className="nav">
                <button
                    type="button"
                    className="nav-logo"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }}
                >
                    PLIVY
                </button>
                <nav>
                    <a href="#about">ABOUT</a>
                    <a href="#experience">EXPERIENCE</a>
                    <a href="#start">START</a>
                </nav>
            </header>

            <main>
                <ScrollScrubIntro />
                <NowPlaying />
                <Record />
                <Discover />
                <Connect />
                <FinalCTA />
            </main>

            <ScrollPlayer />
        </>
    );
}