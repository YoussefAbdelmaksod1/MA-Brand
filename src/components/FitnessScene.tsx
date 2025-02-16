import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Center, useHelper } from '@react-three/drei';
import { SpotLightHelper, DirectionalLightHelper } from 'three';

// Gym Equipment Components
const Dumbbell = ({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#00A3FF" }: { 
  position?: [number, number, number]; 
  rotation?: [number, number, number];
  color?: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <group ref={groupRef} rotation={rotation}>
        {/* Handle */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
          <meshStandardMaterial color="#303030" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Weights */}
        <mesh position={[-1, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const TreadmillMachine = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[3, 0.2, 6]} />
        <meshStandardMaterial color="#202020" />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.5, 0.1, 5]} />
        <meshStandardMaterial color="#303030" />
      </mesh>

      {/* Console */}
      <mesh position={[0, 2, -2]}>
        <boxGeometry args={[2, 1, 0.3]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Handles */}
      <mesh position={[-1, 1.5, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 3]} />
        <meshStandardMaterial color="#505050" />
      </mesh>
      <mesh position={[1, 1.5, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 3]} />
        <meshStandardMaterial color="#505050" />
      </mesh>
    </group>
  );
};

const WeightRack = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Shelves */}
      {[-1, 0, 1].map((y) => (
        <mesh key={y} position={[0, y, 0.2]}>
          <boxGeometry args={[3.8, 0.1, 0.4]} />
          <meshStandardMaterial color="#505050" />
        </mesh>
      ))}

      {/* Weights on shelves */}
      {[-1, 0, 1].map((y) => (
        Array(4).fill(0).map((_, i) => (
          <mesh key={`weight-${y}-${i}`} position={[-1.5 + i, y + 0.3, 0.2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
            <meshStandardMaterial 
              color={y === -1 ? "#FF0000" : y === 0 ? "#00A3FF" : "#FFD700"} 
              metalness={0.8} 
              roughness={0.2} 
            />
          </mesh>
        ))
      ))}
    </group>
  );
};

const YogaMat = ({ position = [0, 0, 0], color = "#FF69B4" }: { position?: [number, number, number]; color?: string }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2, 6]} />
      <meshStandardMaterial color={color} side={2} />
    </mesh>
  );
};

const PunchingBag = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const bagRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!bagRef.current) return;
    bagRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
  });

  return (
    <group ref={bagRef} position={position}>
      {/* Chain */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#707070" metalness={0.9} />
      </mesh>

      {/* Bag */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 3, 32]} />
        <meshStandardMaterial color="#FF0000" roughness={0.8} />
      </mesh>
    </group>
  );
};

const BenchPress = ({ position = [0, -1, 0] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Bench */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color="#202020" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.8, 0, 0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
      <mesh position={[0.8, 0, 0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
      <mesh position={[-0.8, 0, -0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
      <mesh position={[0.8, 0, -0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#303030" />
      </mesh>

      {/* Rack */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 0.1]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 0.1]} />
        <meshStandardMaterial color="#404040" />
      </mesh>

      {/* Barbell with weights */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 5, 32]} />
        <meshStandardMaterial color="#505050" metalness={0.9} />
      </mesh>
      <mesh position={[-2, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#FF0000" metalness={0.8} />
      </mesh>
      <mesh position={[2, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#FF0000" metalness={0.8} />
      </mesh>
    </group>
  );
};

const Lights = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  // Uncomment for debugging lights
  // useHelper(spotLightRef, SpotLightHelper, 'white');
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, 'red');

  useFrame((state) => {
    if (!spotLightRef.current) return;
    spotLightRef.current.position.x = Math.sin(state.clock.getElapsedTime()) * 3;
    spotLightRef.current.position.z = Math.cos(state.clock.getElapsedTime()) * 3;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={0.5}
        castShadow
      />
      <spotLight
        ref={spotLightRef}
        position={[5, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#00A3FF"
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FF0000" />
    </>
  );
};

const LevelUpText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!textRef.current) return;
    textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={[0, 2, -2]}
    >
      <Center ref={textRef}>
        <Text
          fontSize={1}
          color="#00A3FF"
          font="/fonts/Orbitron_Bold.json"
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          LEVEL UP
        </Text>
      </Center>
    </Float>
  );
};

const FitnessScene = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60 }}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          <Lights />
          
          {/* Equipment Layout */}
          {/* Front Row */}
          <Dumbbell position={[-4, 0, 2]} rotation={[0, Math.PI / 4, 0]} color="#FF0000" />
          <Dumbbell position={[4, 0, 2]} rotation={[0, -Math.PI / 4, 0]} color="#00A3FF" />
          
          {/* Middle Row */}
          <BenchPress position={[0, -1, 0]} />
          <WeightRack position={[-6, 0, -2]} />
          <WeightRack position={[6, 0, -2]} />
          
          {/* Back Row */}
          <TreadmillMachine position={[-4, 0, -6]} />
          <PunchingBag position={[4, 2, -4]} />
          
          {/* Floor */}
          <YogaMat position={[-2, 0.01, 4]} color="#FF69B4" />
          <YogaMat position={[2, 0.01, 4]} color="#00A3FF" />
          
          {/* Text */}
          <LevelUpText />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FitnessScene; 