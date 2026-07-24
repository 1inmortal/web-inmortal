import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SHADERS ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float line = step(0.98, fract(p.y * 20.0 + time * 2.0));
    float noise = random(p + time) * 0.1;
    vec3 col = vec3(0.0, 0.5, 1.0) * line + vec3(noise);
    float scanline = sin(p.y * 800.0) * 0.04;
    col -= scanline;
    gl_FragColor = vec4(col, 0.4);
  }
`;

function ParticleField() {
  const pointsRef = useRef();
  const particlesCount = 2000;
  const posArray = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [particlesCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={posArray} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#58a6ff" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function GlitchObject() {
  const meshRef = useRef();
  const uniforms = useMemo(() => ({ time: { value: 0 } }), []);
  const { viewport } = useThree();
  
  // Posición responsive basada en el viewport 3D de R3F (no window.innerWidth para evitar re-renders)
  const isMobile = viewport.width < 5;
  const targetPosition = useMemo(() => (isMobile ? [0, 2, -2] : [2, 0, 0]), [isMobile]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={targetPosition}>
      <torusKnotGeometry args={[1.5, 0.4, 100, 16]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} wireframe={true} transparent={true} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function InfiniteGrid() {
  const gridRef = useRef();
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
    }
  });
  return (
    <group ref={gridRef} position={[0, -2, 0]}>
      <gridHelper args={[100, 100, 0x30363d, 0x30363d]} position={[0, 0, 0]} />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Animamos la cámara basándonos en el progreso del scroll de todo el cuerpo
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // Rotar cámara sutilmente hacia abajo y alejarla un poco
        camera.position.y = gsap.utils.interpolate(0, 5, self.progress);
        camera.position.z = gsap.utils.interpolate(5, 10, self.progress);
        camera.rotation.x = gsap.utils.interpolate(0, -0.5, self.progress);
      }
    });
  }, [camera]);

  return null;
}

export default function ThreeScene() {
  // Detección de dispositivo de un solo paso para evitar re-crear el Composer
  const isTouch = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020304]">
      <div className="absolute inset-0 bg-notebook-pattern opacity-30"></div>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={['#020304', 3, 15]} />
        <CameraRig />
        <ParticleField />
        <InfiniteGrid />
        <GlitchObject />
        {!isTouch && (
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.8} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
