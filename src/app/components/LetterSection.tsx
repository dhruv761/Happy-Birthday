"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "Dear Dilkash,",                                                       style: "italic text-[#c9a96e] mb-1" },
  { text: "Happy 24th.",                                                          style: "font-semibold mt-1 mb-1" },
  { text: "There's a certain way you exist that doesn't feel ordinary.",          style: "" },
  { text: "Like someone equally at home with a book in hand",                    style: "" },
  { text: "or a steering wheel in motion,",                                       style: "" },
  { text: "switching between worlds without making it look like effort.",         style: "" },
  { text: "You have that quiet pull, coffee in the hours,",                      style: "" },
  { text: "pages of fantasy stories. Nothing about it feels rehearsed.",         style: "" },
  { text: "There's sweetness in you that doesn't announce itself,",              style: "" },
  { text: "and a sharpness that shows up only when it needs to.",                style: "" },
  { text: "Most people don't manage that balance.",                               style: "" },
  { text: "You do it without trying to explain it.",                              style: "" },
  { text: "Even in the way you're angry or amused or completely unbothered,",    style: "" },
  { text: "there's something consistent underneath,",                             style: "" },
  { text: "real, but not easily figured out.",                                    style: "" },
  { text: "Some people are easy to place. You aren't.",                          style: "" },
  { text: "And that's where the interest stays.",                                 style: "" },
  { text: "Happy birthday.",                                                      style: "mt-1" },
  { text: "your secret admirer",                                                  style: "italic text-[#c9a96e] mt-1" },
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
