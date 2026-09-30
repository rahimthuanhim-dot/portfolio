import { Tag } from '../ui/Tag';
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

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
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
      </div>
    </section>
  );
}
