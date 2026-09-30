import { useEffect, useRef } from 'react';
import { Vector2 } from 'three';

export function useMouseUniform() {
  const pointer = useRef({
    current: new Vector2(-2, -2),
    target: new Vector2(-2, -2),
    active: 0,
    targetActive: 0,
  });

  useEffect(() => {
    const desktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    );
    if (!desktopPointer.matches) {
      return;
    }

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      pointer.current.target.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
      );
      pointer.current.targetActive = 1;
    };
    const clearPointer = () => {
      pointer.current.target.set(-2, -2);
      pointer.current.targetActive = 0;
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('blur', clearPointer);
    document.addEventListener('pointerleave', clearPointer);

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('blur', clearPointer);
      document.removeEventListener('pointerleave', clearPointer);
    };
  }, []);

  return pointer;
}
