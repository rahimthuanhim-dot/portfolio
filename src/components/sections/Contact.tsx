import { GlassPanel } from '../ui/GlassPanel';
import { useInView } from '../../hooks/useInView';
import './contact.css';

const contactMethods = [
  {
    label: 'Instagram',
    value: '@rahimthuanphaomei',
    href: 'https://www.instagram.com/rahimthuanphaomei/?hl=en',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'rahimthuanhim-dot',
    href: 'https://github.com/rahimthuanhim-dot',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Rahimthuan Phaomei',
    href: 'https://www.linkedin.com/in/rahimthuan-phaomei-b3007a379/',
    external: true,
  },
  {
    label: 'Email',
    value: 'rahimthuanhim@gmail.com',
    href: 'mailto:rahimthuanhim@gmail.com',
    external: false,
  },
  {
    label: 'Phone',
    value: '9362836650',
    href: 'tel:9362836650',
    external: false,
  },
];

export function Contact() {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.1 });

  return (
    <section
      className={`contact section-reveal${inView ? ' section-reveal--visible' : ''}`}
      id="contact"
      aria-labelledby="contact-title"
      ref={ref}
    >
      <header className="contact__header">
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-title">Let’s connect.</h2>
        <p className="contact__intro">
          Reach out about a project, collaboration, or just to say hello.
        </p>
      </header>

      <div className="contact__grid">
        {contactMethods.map((method) => (
          <GlassPanel
            as="article"
            className="contact__card"
            intensity="subtle"
            key={method.label}
          >
            <span className="contact__label">{method.label}</span>
            <a
              className="contact__link"
              href={method.href}
              {...(method.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              {method.value}
              {method.external && (
                <span aria-hidden="true" className="contact__external">
                  ↗
                </span>
              )}
            </a>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
