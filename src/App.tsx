import { NavBar } from './components/ui/NavBar';
import { TopoCanvas } from './background/TopoCanvas';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <div className="app-shell">
      <TopoCanvas />
      <NavBar brand="Portfolio" />
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
