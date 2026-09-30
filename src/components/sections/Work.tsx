import { projects } from '../../data/projects';
import { GlassPanel } from '../ui/GlassPanel';
import { Tag } from '../ui/Tag';
import './work.css';

export function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="work__header">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title">Projects I’ve worked on</h2>
        <p className="work__intro">
          A few websites I’ve built, plus a real-world project currently in
          progress.
        </p>
      </header>

      <div className="work__grid">
        {projects.map((project) => (
          <GlassPanel
            className="work__project"
            intensity="subtle"
            key={project.title}
            as="article"
          >
            <div className="work__project-heading">
              <h3>{project.title}</h3>
              {project.status && <Tag>{project.status}</Tag>}
            </div>
            <p className="work__project-description">{project.description}</p>
            <ul className="work__tags" aria-label={`${project.title} categories`}>
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
            {project.href && (
              <a
                className="work__link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} live website (opens in a new tab)`}
              >
                View live site <span aria-hidden="true">↗</span>
              </a>
            )}
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
