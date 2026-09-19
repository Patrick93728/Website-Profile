import Hero from './components/Hero';
import CapabilityHighlights from './components/CapabilityHighlights';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <>
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <ThemeToggle />
      {/* Ambient Background Orbs */}
      <div className="bg-orb-1" aria-hidden="true" />
      <div className="bg-orb-2" aria-hidden="true" />

      {/* Main Content */}
      <main className="relative z-10">
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
