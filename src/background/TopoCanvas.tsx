import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Fallback } from './Fallback';
import { TopoTerrain } from './TopoTerrain';
import { useQualityTier } from './useQualityTier';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './topo-canvas.css';

export function TopoCanvas() {
  const tier = useQualityTier();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Fallback />;
  }

  const dpr: [number, number] | number =
    tier === 'high' ? [1, 1.6] : tier === 'medium' ? [1, 1.25] : 1;

  return (
    <div className="topo-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 9, 13], fov: 42, near: 0.1, far: 100 }}
        dpr={dpr}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: tier === 'high',
          powerPreference: 'low-power',
        }}
        fallback={<Fallback />}
      >
        <TopoTerrain tier={tier} />
        <EffectComposer multisampling={tier === 'high' ? 2 : 0}>
          <Bloom
            intensity={0.14}
            luminanceThreshold={0.09}
            luminanceSmoothing={0.18}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
