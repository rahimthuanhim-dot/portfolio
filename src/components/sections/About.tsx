import { Tag } from '../ui/Tag';
import { useInView } from '../../hooks/useInView';
import './about.css';

const areasOfExperience = [
  'C++',
  'C',
  'Python',
  'HTML',
  'JavaScript',
  'CSS',
  'SQL / DBMS',
];

const languages = ['English', 'Hindi', 'Spanish (basic)'];

export function About() {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.1 });

  return (
    <section
      aria-labelledby="about-title"
      className={`about section-reveal${inView ? ' section-reveal--visible' : ''}`}
      id="about"
      ref={ref}
    >
      <div className="about__content">
        <p className="eyebrow">A little about me</p>
        <h2 id="about-title">
          I’m Rahimthuan Phaomei
          <span className="about__nickname"> — Rahim</span>
        </h2>
        <p className="about__intro">
          I’m an Artificial Intelligence and Machine Learning student, and a
          part-time freelancer building websites for businesses.
        </p>
      </div>

      <div className="about__skills">
        <h3 className="about__skills-title">Technologies I’m familiar with</h3>
        <p className="about__skills-description">
          I have some familiarity with:
        </p>
        <ul className="about__skill-list" aria-label="Technologies">
          {areasOfExperience.map((area) => (
            <li key={area}>
              <Tag>{area}</Tag>
            </li>
          ))}
        </ul>
        <h3 className="about__skills-title">Languages</h3>
        <ul className="about__skill-list" aria-label="Languages">
          {languages.map((language) => (
            <li key={language}>
              <Tag>{language}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
