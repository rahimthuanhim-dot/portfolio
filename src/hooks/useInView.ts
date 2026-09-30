import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = false, root, rootMargin, threshold } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (once && inView)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, once, root, rootMargin, threshold]);

  return { ref, inView };
}
