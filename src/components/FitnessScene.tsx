import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Equipment {
  x: number;
  y: number;
  type: 'dumbbell' | 'kettlebell' | 'barbell' | 'plate' | 'protein';
  size: number;
  rotation: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
  opacity: number;
  layer: number;
  initialY: number;
  color: string;
}

const FitnessScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const equipment = useRef<Equipment[]>([]);
  const animationFrameId = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
      initializeEquipment();
    };

    const initializeEquipment = () => {
      const numEquipment = 25; // Balanced number for performance
      equipment.current = [];

      const types: ('dumbbell' | 'kettlebell' | 'barbell' | 'plate' | 'protein')[] = 
        ['dumbbell', 'kettlebell', 'barbell', 'plate', 'protein'];
      const colors = ['#00A3FF', '#FF0000', '#FFD700', '#9945FF'];

      // Create equipment in three layers
      for (let layer = 0; layer < 3; layer++) {
        const layerCount = Math.floor(numEquipment / 3);
        for (let i = 0; i < layerCount; i++) {
          const type = types[Math.floor(Math.random() * types.length)];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Adjust size based on layer (smaller in back, larger in front)
          const baseSize = 15 + (layer * 10);
          const size = baseSize + Math.random() * 10;
          
          // Adjust opacity based on layer
          const opacity = 0.3 + (layer * 0.2);
          
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;

          equipment.current.push({
            x,
            y,
            initialY: y,
            type,
            size,
            rotation: Math.random() * Math.PI * 2,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            opacity,
            layer,
            color
          });
        }
      }
    };

    const drawDumbbell = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Handle
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillRect(-size/2, -size/8, size, size/4);

      // Weights
      ctx.beginPath();
      ctx.arc(-size/2, 0, size/3, 0, Math.PI * 2);
      ctx.arc(size/2, 0, size/3, 0, Math.PI * 2);
      ctx.fill();

      // Metallic shine
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = opacity * 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/6);
      ctx.lineTo(size/2, -size/6);
      ctx.stroke();

      ctx.restore();
    };

    const drawKettlebell = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Body
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, size/3, size/2, 0, Math.PI * 2);
      ctx.fill();

      // Handle
      ctx.strokeStyle = color;
      ctx.lineWidth = size/6;
      ctx.beginPath();
      ctx.arc(0, -size/4, size/3, 0, Math.PI);
      ctx.stroke();

      // Shine
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = opacity * 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, size/3, size/4, -Math.PI/4, Math.PI/4);
      ctx.stroke();

      ctx.restore();
    };

    const drawBarbell = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Bar
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillRect(-size, -size/8, size * 2, size/4);

      // Plates
      ctx.beginPath();
      ctx.arc(-size, 0, size/2, 0, Math.PI * 2);
      ctx.arc(size, 0, size/2, 0, Math.PI * 2);
      ctx.fill();

      // Shine
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = opacity * 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size, -size/4);
      ctx.lineTo(size, -size/4);
      ctx.stroke();

      ctx.restore();
    };

    const drawPlate = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Outer ring
      ctx.strokeStyle = color;
      ctx.lineWidth = size/6;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, size/4, 0, Math.PI * 2);
      ctx.fill();

      // Shine
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = opacity * 0.3;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, size/3, -Math.PI/4, Math.PI/4);
      ctx.stroke();

      ctx.restore();
    };

    const drawProtein = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Container
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.fillRect(-size/3, -size/2, size*2/3, size);

      // Label
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = opacity * 0.3;
      ctx.fillRect(-size/4, -size/3, size/2, size/3);

      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sort equipment by layer for proper depth rendering
      equipment.current.sort((a, b) => a.layer - b.layer);

      const scrollOffset = window.scrollY * 0.1;

      equipment.current.forEach(item => {
        // Parallax effect based on layer
        const parallaxFactor = 0.05 * (3 - item.layer);
        const parallaxOffset = scrollOffset * parallaxFactor;

        // Update position with floating motion
        item.x += item.speedX;
        item.y = item.initialY + Math.sin(Date.now() * 0.001 + item.x) * 2 - parallaxOffset;
        item.rotation += item.rotationSpeed;

        // Wrap around screen
        const padding = item.size * 2;
        if (item.x < -padding) item.x = canvas.width + padding;
        if (item.x > canvas.width + padding) item.x = -padding;
        if (item.y < -padding) item.y = canvas.height + padding;
        if (item.y > canvas.height + padding) item.y = -padding;

        // Draw equipment based on type
        switch (item.type) {
          case 'dumbbell':
            drawDumbbell(ctx, item.x, item.y, item.size, item.rotation, item.opacity, item.color);
            break;
          case 'kettlebell':
            drawKettlebell(ctx, item.x, item.y, item.size, item.rotation, item.opacity, item.color);
            break;
          case 'barbell':
            drawBarbell(ctx, item.x, item.y, item.size, item.rotation, item.opacity, item.color);
            break;
          case 'plate':
            drawPlate(ctx, item.x, item.y, item.size, item.rotation, item.opacity, item.color);
            break;
          case 'protein':
            drawProtein(ctx, item.x, item.y, item.size, item.rotation, item.opacity, item.color);
            break;
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(0,163,255,0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 80%, rgba(255,0,0,0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 20%, rgba(0,163,255,0.15) 0%, transparent 40%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-game-blue/10 blur-3xl"
          style={{ top: '20%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-game-red/10 blur-3xl"
          style={{ bottom: '20%', right: '10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Scanlines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)',
          backgroundSize: '4px 4px'
        }}
      />
    </div>
  );
};

export default FitnessScene; 