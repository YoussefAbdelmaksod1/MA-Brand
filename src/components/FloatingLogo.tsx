import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import { Environment, Float } from '@react-three/drei';

const Logo = () => {
  const texture = useLoader(TextureLoader, '/4.gif');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh
        ref={meshRef}
        scale={1}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          map={texture}
          transparent
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
};

const FloatingLogo = () => {
  return (
    <motion.div 
      className="w-64 h-64"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 10,
        delay: 0.5
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Logo />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default FloatingLogo; 