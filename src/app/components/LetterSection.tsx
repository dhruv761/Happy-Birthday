"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "Happy 24th!",
  "Keep chasing adventures, getting lost in books,",
  "and finding joy in the little, unexpected moments.",
  "\u00a0",
  "Stay wild…",
  "and let a few paths still find their way back to me.",
  "\u00a0",
  "With warmth, always.",
];

export default function LetterSection({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState<boolean[]>(LINES.map(() => false));
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        LINES.forEach((_, i) => {
          setTimeout(() => setShown((prev) => { const n = [...prev]; n[i] = true; return n; }), i * 260);
        });
      }
    }, { threshold: 0.4 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="snap-section reveal"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #fdf6ee 60%, #fde8e8 100%)" }}
    >
      <div className="w-full px-4" style={{ maxWidth: "600px" }}>
        <div className="bg-[#fffdf8] border border-[rgba(201,169,110,0.2)] rounded-sm px-10 py-8 shadow-[0_20px_70px_rgba(150,100,80,0.1)]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[rgba(201,169,110,0.2)]">
            <span className="font-body text-xs text-[#8a7a7a] tracking-widest">April 30, 2026</span>
            <span className="text-[#c9a96e] text-xl">✦</span>
          </div>
          <div>
            {LINES.map((line, i) => (
              <p key={i}
                className={`letter-line font-serif-display leading-[1.85] text-[#3a2e2e] ${i === LINES.length - 1 ? "italic text-[#c9a96e] mt-3" : ""} ${shown[i] ? "show" : ""}`}
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
