import { useEffect, useRef } from 'react';

export function useSectionLineOpacity() {
  const opacity = useRef(0.3);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      '.hero, .about, .work, .contact',
    );
    const visibleSections = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
          } else {
            visibleSections.delete(entry.target);
          }
        }

        opacity.current = visibleSections.size > 0 ? 0.15 : 0.3;
      },
      { threshold: 0.1 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return opacity;
}
