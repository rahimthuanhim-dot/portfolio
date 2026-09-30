import { Tag } from '../ui/Tag';
import './hero.css';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__roles">
        <Tag>AIML student</Tag>
        <Tag>Part-time freelance web developer</Tag>
      </div>
      <h1 className="hero__title" id="hero-title">
        I build websites
        <br />
        for businesses.
      </h1>
      <p className="hero__description">
        I study Artificial Intelligence and Machine Learning while building
        websites for businesses as a part-time freelancer.
      </p>
    </section>
  );
}
