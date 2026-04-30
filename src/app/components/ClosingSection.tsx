"use client";
import { useEffect, useRef, useState } from "react";

export default function ClosingSection({ id }: { id: string }) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  const [easterOpen, setEasterOpen] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        setShow(true);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const lines = [
    '"Some people are chapters…',
    "but a few feel like the whole book",
    'is better with them in it."',
  ];

  return (
    <section id={id} ref={ref} className="snap-section reveal flex-col text-center px-6"
      style={{ background: "radial-gradient(ellipse at 60% 50%, #fde8e8 0%, #fdf6ee 50%, #e8e0f0 100%)" }}
    >
      <div>
        {lines.map((line, i) => (
          <p key={i}
            className={`closing-el font-serif-display text-[#8a7a7a] leading-[1.9] ${show ? "show" : ""}`}
            style={{ fontSize: "clamp(1.05rem, 2.8vw, 1.55rem)", transitionDelay: `${i * 0.35}s` }}
          >
            {line}
          </p>
        ))}
        <div className={`closing-el text-[#c9a96e] text-2xl my-6 ${show ? "show" : ""}`}
          style={{ transitionDelay: "1.1s" }}>✦</div>
        <h2 className={`closing-el font-serif-display font-light text-[#3a2e2e] ${show ? "show" : ""}`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", transitionDelay: "1.4s" }}
        >
          Happy 24th.
        </h2>
        <p className={`closing-el font-serif-display italic text-[#8a7a7a] mt-3 ${show ? "show" : ""}`}
          style={{ transitionDelay: "1.8s" }}
        >
          A quiet wish that good things always find you.
        </p>
      </div>

      <button
        onClick={() => setEasterOpen(true)}
        className="absolute bottom-6 right-6 text-[rgba(201,169,110,0.25)] text-sm cursor-pointer hover:text-[#c9a96e] transition-colors select-none border-0 bg-transparent"
        title="A secret..."
      >✦</button>

      {easterOpen && (
        <div className="fixed inset-0 bg-[rgba(58,46,46,0.5)] backdrop-blur-md z-[2000] flex items-center justify-center"
          onClick={() => setEasterOpen(false)}
        >
          <div className="bg-[#fffdf8] border border-[#c9a96e] rounded-2xl px-12 py-10 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif-display text-[1rem] text-[#8a7a7a] mb-3">Here&apos;s the secret:</p>
            <p className="font-serif-display italic text-[1.1rem] text-[#3a2e2e] leading-relaxed">
              &ldquo;You make ordinary days feel like something worth remembering.&rdquo;
            </p>
            <button onClick={() => setEasterOpen(false)}
              className="mt-6 bg-transparent border border-[#c9a96e] text-[#c9a96e] px-5 py-2 rounded text-sm cursor-pointer hover:bg-[#c9a96e] hover:text-white transition-all"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
