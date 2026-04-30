"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ConfettiRef { launch: () => void; }

const ConfettiCanvas = forwardRef<ConfettiRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    launch() {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const pieces = Array.from({ length: 140 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 6 + Math.random() * 8, h: 3 + Math.random() * 5,
        color: ["#f4c2c2","#c9a96e","#e8e0f0","#fde8c8","#d4a0a0"][Math.floor(Math.random() * 5)],
        vy: 2 + Math.random() * 3, vx: (Math.random() - 0.5) * 2,
        angle: Math.random() * Math.PI * 2, va: (Math.random() - 0.5) * 0.12,
      }));
      let frame = 0;
      function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((p) => {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
          ctx.fillStyle = p.color; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
          ctx.restore();
          p.y += p.vy; p.x += p.vx; p.angle += p.va;
        });
        if (++frame < 200) requestAnimationFrame(tick);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      tick();
    },
  }));

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[999]" />;
});
ConfettiCanvas.displayName = "ConfettiCanvas";
export default ConfettiCanvas;
