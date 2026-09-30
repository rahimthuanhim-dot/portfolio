import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { useInView } from '../../hooks/useInView';
import './hero.css';

export function Hero() {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.1 });

  return (
    <section
      aria-labelledby="hero-title"
      className={`hero section-reveal${inView ? ' section-reveal--visible' : ''}`}
      ref={ref}
    >
      <p className="hero__name">Rahimthuan Phaomei <span>(Rahim)</span></p>
      <div className="hero__roles">
        <Tag>AIML student</Tag>
        <Tag>Part-time freelance web developer</Tag>
      </div>
      <h1 className="hero__title" id="hero-title">
        Hola a Todos
      </h1>
      <p className="hero__description">
        I study Artificial Intelligence and Machine Learning, and build clear,
        functional websites for businesses.
      </p>
      <div className="hero__actions">
        <Button as="a" href="#work">View my work</Button>
        <Button as="a" href="#contact" variant="secondary">Get in touch</Button>
      </div>
    </section>
  );
}
