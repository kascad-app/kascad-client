'use client';

import { useEffect, useRef } from 'react';

interface ShapeCanvasProps {
  className?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

const ShapeCanvas: React.FC<ShapeCanvasProps> = ({ className = '', canvasWidth, canvasHeight }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previousVerticesRef = useRef<{ x: number; y: number }[] | null>(null);
  const lastDrawTimeRef = useRef<number>(performance.now());
  const redrawIntervalRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    let animationFrameId: number;
  
    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
  
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastDrawTimeRef.current;
  
      if (elapsedTime > redrawIntervalRef.current) {
        redrawIntervalRef.current = 20000;

        canvas.width = canvasWidth ?? window.innerWidth;
        canvas.height = canvasHeight ?? window.innerHeight;
  
        const vertices = previousVerticesRef.current || [];
        if (vertices.length !== 16) {
          for (let i = 0; i < 16; i++) {
            vertices[i] = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
            };
          }
        }
  
        const targetVertices = Array.from({ length: 16 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        }));
  
        let startTime = currentTime;
        const duration = 10000;
  
        const tween = () => {
          const now = performance.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const currentVertices = vertices.map((v, i) => ({
            x: v.x + (targetVertices[i].x - v.x) * progress,
            y: v.y + (targetVertices[i].y - v.y) * progress,
          }));
  
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Fond blanc
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // Dégradé radial pour la forme avec les couleurs et l'opacité
          const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0, 
            canvas.width / 2, canvas.height / 2, canvas.width / 2
          );
          gradient.addColorStop(0, 'rgba(43, 74, 251, 0.46)'); // Couleur centrale avec opacité
          gradient.addColorStop(1, 'rgba(17, 112, 255, 0.46)'); // Couleur extérieure avec opacité

          // Applique le dégradé
          ctx.beginPath();
          ctx.moveTo(currentVertices[0].x, currentVertices[0].y);
          currentVertices.forEach((v) => ctx.lineTo(v.x, v.y));
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
  
          // Application du flou
          ctx.filter = 'blur(100px)';
          ctx.fillStyle = gradient;
          ctx.fill();

          if (progress < 1) {
            requestAnimationFrame(tween);
          } else {
            startTime = now;
            previousVerticesRef.current = targetVertices;
          }
        };
  
        tween();
        lastDrawTimeRef.current = currentTime;
      }
    };
  
    animationFrameId = requestAnimationFrame(draw);
  
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  

  return <canvas ref={canvasRef} className={className} />;
};

export default ShapeCanvas;
