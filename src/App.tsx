import { NavBar } from './components/ui/NavBar';
import { DeferredTopoCanvas } from './background/DeferredTopoCanvas';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <DeferredTopoCanvas />
      <NavBar
        brand="Rahim"
        items={[
          { label: 'About', href: '#about' },
          { label: 'Work', href: '#work' },
          { label: 'Contact', href: '#contact' },
        ]}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
