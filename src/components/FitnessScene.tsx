import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Center, useHelper } from '@react-three/drei';
import { motion } from 'framer-motion';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Initialize particles
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Interactive effect with mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDistance - distance) / maxDistance;
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
          particle.opacity = Math.min(0.8, particle.opacity + 0.1);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${0.15 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-game-black/95 overflow-hidden">
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-game-blue/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-game-red/20 blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FitnessScene; 