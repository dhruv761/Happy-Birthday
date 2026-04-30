"use client";
import { useState } from "react";

const TRAITS = [
  { icon: "📚", label: "Fantasy Books",  desc: "Worlds within worlds" },
  { icon: "☕", label: "Coffee",         desc: "Fuel for stories & slow mornings" },
  { icon: "🚗", label: "Driving",        desc: "Freedom on four wheels" },
  { icon: "🍺", label: "Fun Nights",     desc: "Chaos worth remembering" },
  { icon: "🌍", label: "Adventure",      desc: "Always choosing the unknown" },
];

export default function AboutSection({ id }: { id: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id={id} className="snap-section reveal flex-col"
      style={{ background: "radial-gradient(ellipse at 60% 40%, #f9e8f0 0%, #fdf6ee 60%, #e8e0f0 100%)" }}
    >
      <h2 className="font-serif-display font-normal text-center mb-8 text-[#3a2e2e]"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
      >
        Things that make you <em className="text-[#c9a96e]">you</em>
      </h2>
      <div className="flex flex-wrap gap-4 justify-center px-4" style={{ maxWidth: "720px" }}>
        {TRAITS.map((t, i) => (
          <div key={i}
            onClick={() => setActive(active === i ? null : i)}
            className={`trait-card relative overflow-hidden cursor-pointer bg-white border border-[rgba(201,169,110,0.25)] rounded-2xl text-center ${active === i ? "active" : ""}`}
            style={{ width: "clamp(120px, 16vw, 140px)", padding: "1.4rem 0.8rem" }}
          >
            <div className="text-[2rem] mb-2">{t.icon}</div>
            <div className="font-body text-xs font-medium tracking-wide text-[#8a7a7a]">{t.label}</div>
            <div className="card-expand absolute inset-0 flex items-center justify-center rounded-2xl text-center px-3 font-serif-display italic text-[0.9rem] text-[#3a2e2e]"
              style={{ background: "linear-gradient(135deg, #fdf1e8, #f9e8f0)" }}
            >
              {t.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
