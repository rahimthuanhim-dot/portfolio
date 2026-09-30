import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = false, root, rootMargin, threshold } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(
    () => typeof document !== 'undefined' && document.visibilityState === 'hidden',
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || (once && inView)) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
          if (once && entry.isIntersecting) {
            observer?.unobserve(element);
          }
        },
        { root, rootMargin, threshold },
      );
      observer.observe(element);
    }

    const checkVisibility = () => {
      const bounds = element.getBoundingClientRect();
      const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (visible || !once) {
        setInView(visible);
      }
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [inView, once, root, rootMargin, threshold]);

  return { ref, inView };
}
