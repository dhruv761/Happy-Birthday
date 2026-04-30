"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "Dear Dilkash,",          style: "italic text-[#c9a96e] mb-2" },
  { text: "\u00a0",                  style: "" },
  { text: "Happy 24th.",             style: "font-semibold" },
  { text: "\u00a0",                  style: "" },
  { text: "There's something unreadable about you in the best way.", style: "" },
  { text: "\u00a0",                  style: "" },
  { text: "Coffee, books, long drives, sudden plans…", style: "" },
  { text: "like pieces that appear and disappear", style: "" },
  { text: "without ever forming a fixed pattern.", style: "" },
  { text: "\u00a0",                  style: "" },
  { text: "You don't feel loud, but you're not easy to miss either.", style: "" },
  { text: "More like someone who exists slightly outside", style: "" },
  { text: "where most people are looking.", style: "" },
  { text: "\u00a0",                  style: "" },
  { text: "There's a mix of softness and edge in you", style: "" },
  { text: "that doesn't sit still long enough to be fully named.", style: "" },
  { text: "\u00a0",                  style: "" },
  { text: "Some people explain themselves easily.", style: "" },
  { text: "You don't seem interested in that at all.", style: "" },
  { text: "\u00a0",                  style: "" },
  { text: "your secret admirer",     style: "italic text-[#c9a96e] mt-2" },
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
          setTimeout(() => setShown((prev) => { const n = [...prev]; n[i] = true; return n; }), i * 160);
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
        <div className="bg-[#fffdf8] border border-[rgba(201,169,110,0.2)] rounded-sm px-10 py-7 shadow-[0_20px_70px_rgba(150,100,80,0.08)]"
          style={{ maxHeight: "82vh", overflowY: "auto" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-[rgba(201,169,110,0.2)]">
            <span className="font-body text-xs text-[#8a7a7a] tracking-widest">May 01, 2026</span>
            <span className="text-[#c9a96e] text-lg">✦</span>
          </div>

          {/* Lines */}
          <div>
            {LINES.map((line, i) => (
              <p key={i}
                className={`letter-line font-serif-display leading-[1.8] text-[#3a2e2e] ${line.style} ${shown[i] ? "show" : ""}`}
                style={{ fontSize: "clamp(0.95rem, 1.7vw, 1.1rem)" }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
