import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Fallback } from './Fallback';
import { TopoTerrain } from './TopoTerrain';
import { useQualityTier } from './useQualityTier';
import { useSectionLineOpacity } from './useSectionLineOpacity';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './topo-canvas.css';

type PerformanceMonitorProps = {
  active: boolean;
  onSlowFrame: () => void;
};

function PerformanceMonitor({
  active,
  onSlowFrame,
}: PerformanceMonitorProps) {
  const elapsed = useRef(0);
  const frames = useRef(0);

  useFrame((_, delta) => {
    if (!active) {
      return;
    }

    elapsed.current += delta;
    frames.current += 1;
    if (elapsed.current >= 1) {
      if (frames.current / elapsed.current < 45) {
        onSlowFrame();
      }
      elapsed.current = 0;
      frames.current = 0;
    }
  });

  return null;
}

export function TopoCanvas() {
  const tier = useQualityTier();
  const lineOpacity = useSectionLineOpacity();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 48rem)').matches,
  );
  const [performanceStep, setPerformanceStep] = useState(0);
  const [hasRenderedFrame, setHasRenderedFrame] = useState(false);
  const markFirstFrame = useCallback(() => setHasRenderedFrame(true), []);
  const lowerPerformanceStep = useCallback(
    () => setPerformanceStep((step) => Math.min(step + 1, 3)),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 48rem)');
    const updateMobile = () => setIsMobile(media.matches);
    media.addEventListener('change', updateMobile);
    return () => media.removeEventListener('change', updateMobile);
  }, []);

  const dpr: [number, number] | number =
    isMobile || performanceStep >= 1 ? 1 : [1, 1.5];
  const isStatic = reducedMotion || performanceStep >= 3;
  const animate = !isStatic;

  return (
    <div
      className={`topo-canvas${hasRenderedFrame ? ' topo-canvas--ready' : ''}`}
      aria-hidden="true"
      data-reduced-motion={reducedMotion || undefined}
    >
      <Canvas
        camera={{ position: [0, 9, 13], fov: 42, near: 0.1, far: 100 }}
        dpr={dpr}
        frameloop={animate ? 'always' : 'demand'}
        gl={{
          alpha: true,
          antialias: !isMobile && tier === 'high',
          powerPreference: 'low-power',
        }}
        fallback={<Fallback />}
        tabIndex={-1}
      >
        <TopoTerrain
          isMobile={isMobile}
          reduceSegments={performanceStep >= 2}
          lineOpacity={lineOpacity}
          animate={animate}
          onFirstFrame={markFirstFrame}
        />
        {!isMobile && (
          <EffectComposer multisampling={tier === 'high' ? 2 : 0}>
            <Bloom
              intensity={0.14}
              luminanceThreshold={0.09}
              luminanceSmoothing={0.18}
              mipmapBlur
            />
          </EffectComposer>
        )}
        <PerformanceMonitor
          active={animate && performanceStep < 3}
          onSlowFrame={lowerPerformanceStep}
        />
      </Canvas>
    </div>
  );
}
