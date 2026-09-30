import { useRef } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useInView } from '../../hooks/useInView';
import './work.css';

function ProjectDetails({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  };

  const closeOnEscape = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        aria-label={`See details: ${project.title}`}
        className={`project-action project-action--secondary${project.liveUrl ? '' : ' project-action--primary'}`}
        onClick={() => dialogRef.current?.showModal()}
        ref={triggerRef}
        type="button"
      >
        See details
      </button>
      <dialog
        aria-labelledby={`${project.id}-dialog-title`}
        className="project-dialog"
        onKeyDown={closeOnEscape}
        onCancel={(event) => {
          event.preventDefault();
          dialogRef.current?.close();
        }}
        onClick={closeOnBackdrop}
        onClose={() => triggerRef.current?.focus()}
        ref={dialogRef}
      >
        <div className="project-dialog__content">
          <button
            aria-label={`Close details: ${project.title}`}
            className="project-dialog__close"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="eyebrow">Project details</p>
          <h2 id={`${project.id}-dialog-title`}>{project.title}</h2>
          <p>{project.summary}</p>
          <dl className="project-dialog__facts">
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
            <div>
              <dt>What I built</dt>
              <dd>{project.built}</dd>
            </div>
            <div>
              <dt>Outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
          {project.liveUrl && (
            <a
              aria-label={`View project: ${project.title}`}
              className="project-action project-action--primary"
              href={project.liveUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View project <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}

export function Work() {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.1 });

  return (
    <section
      aria-labelledby="work-title"
      className={`work section-reveal${inView ? ' section-reveal--visible' : ''}`}
      id="work"
      ref={ref}
    >
      <header className="work__header">
        <p className="eyebrow">Selected work</p>
        <h2 id="work-title">Projects I’ve worked on</h2>
        <p className="work__intro">
          Websites I’ve built and a real-world project in progress.
        </p>
      </header>

      <ul className="project-list">
        {projects.map((project, index) => (
          <li className="project-row" key={project.id}>
            <span className="project-row__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="project-row__body">
              <h3 className="project-row__title">
                {project.title}
                <span aria-hidden="true" className="project-row__arrow">
                  ↗
                </span>
              </h3>
              <p className="project-row__description">{project.description}</p>
              <p className="project-row__stack">{project.stack.join(' · ')}</p>
              <div className="project-row__actions">
                {project.liveUrl && (
                  <a
                    aria-label={`View project: ${project.title}`}
                    className="project-action project-action--primary"
                    href={project.liveUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View project <span aria-hidden="true">↗</span>
                  </a>
                )}
                <ProjectDetails project={project} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
