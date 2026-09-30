import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { BufferGeometry } from 'three';
import { useMouseUniform } from './useMouseUniform';
import vertexShader from './shaders/terrain.vert.glsl?raw';
import fragmentShader from './shaders/terrain.frag.glsl?raw';
type TopoTerrainProps = {
  isMobile: boolean;
  reduceSegments: boolean;
  lineOpacity: { current: number };
  animate: boolean;
  onFirstFrame: () => void;
};

export function TopoTerrain({
  isMobile,
  reduceSegments,
  lineOpacity,
  animate,
  onFirstFrame,
}: TopoTerrainProps) {
  const pointer = useMouseUniform(animate && !isMobile);
  const elapsedTime = useRef(0);
  const didNotifyFirstFrame = useRef(false);
  const geometryRef = useRef<BufferGeometry>(null);
  const [widthSegments, heightSegments] =
    isMobile || reduceSegments ? [64, 64] : [128, 128];
  const uniforms = useMemo(
    () => ({ uLineOpacity: { value: 0.3 } }),
    [],
  );

  useFrame((_, delta) => {
    if (!didNotifyFirstFrame.current) {
      didNotifyFirstFrame.current = true;
      onFirstFrame();
    }

    const pointerState = pointer.current;
    uniforms.uLineOpacity.value = lineOpacity.current;
    if (animate) {
      elapsedTime.current += delta;
      pointerState.current.lerp(pointerState.target, 1 - Math.exp(-delta * 3.5));
      pointerState.active +=
        (pointerState.targetActive - pointerState.active) *
        (1 - Math.exp(-delta * 3.5));
    }

    const position = geometryRef.current?.getAttribute('position');
    if (!position) {
      return;
    }

    const time = animate ? elapsedTime.current * 1.15 : 0;
    const pointerX = (pointerState.current.x - 0.5) * 36;
    const pointerY = (pointerState.current.y - 0.5) * 30;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const broadWave = Math.sin(x * 0.42 + time) * 0.42;
      const crossingWave = Math.cos(y * 0.51 - time * 0.8) * 0.3;
      const diagonalWave = Math.sin((x + y) * 0.31 + time * 0.6) * 0.18;
      const pointerDistance = Math.hypot(x - pointerX, y - pointerY);
      const ripple = animate
        ? Math.sin(pointerDistance * 2.4 - elapsedTime.current * 1.8) *
          Math.exp(-pointerDistance * 0.48) *
          pointerState.active *
          0.16
        : 0;

      position.setZ(index, broadWave + crossingWave + diagonalWave + ripple);
    }

    position.needsUpdate = true;
  });

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
