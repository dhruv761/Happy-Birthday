"use client";
import { useEffect, useRef } from "react";

export default function PetalsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const COLORS = [
      "rgba(244,194,194,0.55)",
      "rgba(232,224,240,0.55)",
      "rgba(201,169,110,0.35)",
      "rgba(253,230,210,0.55)",
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    type Petal = { x: number; y: number; r: number; vx: number; vy: number; angle: number; va: number; color: string };
    function spawn(): Petal {
      return {
        x: Math.random() * canvas.width,
        y: -20,
        r: 4 + Math.random() * 7,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.4 + Math.random() * 0.7,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.03,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    const petals: Petal[] = Array.from({ length: 28 }, () => { const p = spawn(); p.y = Math.random() * canvas.height; return p; });
    let raf: number;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
        p.x += p.vx; p.y += p.vy; p.angle += p.va;
        if (p.y > canvas.height + 20) Object.assign(p, spawn());
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
