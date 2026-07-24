import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { EffectComposer, RenderPass, UnrealBloomPass } from '@react-three/postprocessing';
import * as THREE from 'three';

// Particle layer
function Particles({ isTouch }) {
  const points = useRef();
  const count = isTouch ? 300 : 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (points.current) {
      points.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.005;
    }
  });

  return (
    <points ref={points}>
      <pointsMaterial color={0x58a6ff} size={0.02} transparent opacity={0.4} />
    </points>
  );
}

// Infinite grid layer
function InfiniteGrid() {
  const grid = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (grid.current) {
      grid.current.position.z = (t * 2) % 1;
    }
  });
  return <gridHelper ref={grid} args={[50, 50, 0x30363d, 0x30363d]} position={[0, -2, 0]} />;
}

// Corrupted TorusKnot with custom shader
function CorruptedKnot({ isTouch }) {
  const knot = useRef();
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(0x58a6ff) },
      },
      vertexShader: `
        uniform float u_time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.x += sin(pos.y * 10.0 + u_time) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec3 u_color;
        varying vec2 vUv;
        void main() {
          float scanline = sin(vUv.y * 800.0) * 0.04;
          vec3 col = u_color + vec3(scanline);
          gl_FragColor = vec4(col, 0.8);
        }
      `,
      wireframe: true,
      transparent: true,
    });
  }, []);

  useFrame(({ clock }) => {
    if (knot.current) {
      knot.current.rotation.x = clock.getElapsedTime() * 0.2;
      knot.current.rotation.y = clock.getElapsedTime() * 0.3;
      material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={knot} material={material} position-x={window.innerWidth > 768 ? 2 : 0}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
    </mesh>
  );
}

export default function ThreeScene() {
  const isTouch = typeof navigator !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <color attach="background" args={['#020304']} />
      <fog attach="fog" args={['#020304', 0.05]} />
      <Particles isTouch={isTouch} />
      <InfiniteGrid />
      <CorruptedKnot isTouch={isTouch} />
      <EffectComposer>
        <RenderPass attachArray="passes" scene={null} camera={null} />
        {!isTouch && <UnrealBloomPass attachArray="passes" args={[new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.8, 0.85]} />}
      </EffectComposer>
    </Canvas>
  );
}
