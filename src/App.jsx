import './index.css';
import Hero from './components/Hero';
import CapabilityHighlights from './components/CapabilityHighlights';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#2563EB] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />
        <CapabilityHighlights />
        <Services />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
