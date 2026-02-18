import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyParticipate from '../components/sections/WhyParticipate';
import Themes from '../components/sections/Themes';
import Timeline from '../components/sections/Timeline';
import Schedule from '../components/sections/Schedule';
import Prizes from '../components/sections/Prizes';
import Statistics from '../components/sections/Statistics';
import Gallery from '../components/sections/Gallery';
import FAQ from '../components/sections/FAQ';
import Sponsors from '../components/sections/Sponsors';
import Contact from '../components/sections/Contact';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <WhyParticipate />
                <Themes />
                <Timeline />
                <Schedule />
                <Prizes />
                <Statistics />
                <Gallery />
                <FAQ />
                <Sponsors />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
