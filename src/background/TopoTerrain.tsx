import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { BufferGeometry } from 'three';
import { useMouseUniform } from './useMouseUniform';
import vertexShader from './shaders/terrain.vert.glsl?raw';
import fragmentShader from './shaders/terrain.frag.glsl?raw';
import type { QualityTier } from './useQualityTier';

type TopoTerrainProps = {
  tier: QualityTier;
};

const segmentsByTier = {
  low: [42, 34],
  medium: [64, 48],
  high: [92, 68],
} satisfies Record<QualityTier, [number, number]>;

export function TopoTerrain({ tier }: TopoTerrainProps) {
  const pointer = useMouseUniform();
  const elapsedTime = useRef(0);
  const geometryRef = useRef<BufferGeometry>(null);
  const uniforms = useMemo(
    () => ({ uOpacity: { value: 0.38 } }),
    [],
  );

  useFrame((_, delta) => {
    const pointerState = pointer.current;
    elapsedTime.current += delta;
    pointerState.current.lerp(pointerState.target, 1 - Math.exp(-delta * 3.5));
    pointerState.active +=
      (pointerState.targetActive - pointerState.active) *
      (1 - Math.exp(-delta * 3.5));

    const position = geometryRef.current?.getAttribute('position');
    if (!position) {
      return;
    }

    const time = elapsedTime.current * 1.15;
    const pointerX = (pointerState.current.x - 0.5) * 36;
    const pointerY = (pointerState.current.y - 0.5) * 30;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const broadWave = Math.sin(x * 0.42 + time) * 0.42;
      const crossingWave = Math.cos(y * 0.51 - time * 0.8) * 0.3;
      const diagonalWave = Math.sin((x + y) * 0.31 + time * 0.6) * 0.18;
      const pointerDistance = Math.hypot(x - pointerX, y - pointerY);
      const ripple =
        Math.sin(pointerDistance * 2.4 - elapsedTime.current * 1.8) *
        Math.exp(-pointerDistance * 0.48) *
        pointerState.active *
        0.16;

      position.setZ(index, broadWave + crossingWave + diagonalWave + ripple);
    }

    position.needsUpdate = true;
  });

  const [widthSegments, heightSegments] = segmentsByTier[tier];

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
      <planeGeometry
        ref={geometryRef}
        args={[36, 30, widthSegments, heightSegments]}
      />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
