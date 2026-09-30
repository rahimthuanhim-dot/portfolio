import { useEffect, useState } from 'react';

type TopoCanvasComponent = typeof import('./TopoCanvas').TopoCanvas;

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function DeferredTopoCanvas() {
  const [CanvasComponent, setCanvasComponent] =
    useState<TopoCanvasComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    const idleWindow = window as IdleWindow;
    let timeoutHandle: number | undefined;
    let idleHandle: number | undefined;

    const loadCanvas = () => {
      void import('./TopoCanvas').then(({ TopoCanvas }) => {
        if (!cancelled) {
          setCanvasComponent(() => TopoCanvas);
        }
      });
    };

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(loadCanvas, { timeout: 1500 });
    } else {
      timeoutHandle = window.setTimeout(loadCanvas, 300);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  return CanvasComponent ? <CanvasComponent /> : null;
}
