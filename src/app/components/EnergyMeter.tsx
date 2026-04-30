"use client";
import { useState } from "react";

const STAGES = [
  { label: "Calm ✨",          pct: 20 },
  { label: "Happy 😊",         pct: 45 },
  { label: "Adventurous 🌍",   pct: 70 },
  { label: "Chaos Mode 🎉",    pct: 100 },
];

export default function EnergyMeter({ id, onMax }: { id: string; onMax: () => void }) {
  const [level, setLevel] = useState(0);
  const [done, setDone] = useState(false);

  const charge = () => {
    if (level < STAGES.length) {
      const next = level + 1;
      setLevel(next);
      if (next === STAGES.length) { setDone(true); onMax(); }
    }
  };

  const current = STAGES[level - 1];

  return (
    <section id={id} className="reveal py-24 px-6 text-center relative z-[1]"
      style={{ background: "linear-gradient(180deg, #fdf6ee 0%, #f8eeee 100%)" }}
    >
      <h2 className="font-serif-display font-normal text-center mb-10 text-[#3a2e2e]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
      >
        Today's Birthday Energy Level
      </h2>
      <div className="max-w-lg mx-auto mb-8">
        <div className="h-3.5 bg-[rgba(201,169,110,0.15)] rounded-full overflow-hidden mb-2">
          <div className="meter-fill h-full rounded-full"
            style={{
              width: current ? `${current.pct}%` : "0%",
              background: "linear-gradient(90deg, #f4c2c2, #c9a96e)",
            }}
          />
        </div>
        <div className="flex justify-between text-[0.72rem] text-[#8a7a7a] tracking-wide">
          {STAGES.map((s) => <span key={s.label}>{s.label.split(" ")[0]}</span>)}
        </div>
        <div className="mt-5 font-serif-display text-[1.4rem] text-[#c9a96e] min-h-8 transition-all">
          {current?.label ?? "Click to charge ↓"}
        </div>
      </div>
      {!done && (
        <button onClick={charge}
          className="px-9 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-sm tracking-widest cursor-pointer rounded-sm transition-all hover:bg-[#c9a96e] hover:text-white"
        >
          Charge it up!
        </button>
      )}
      {done && (
        <p className="font-serif-display italic text-[1.1rem] text-[#3a2e2e] mt-4 transition-opacity duration-700">
          Exactly how it should be.
        </p>
      )}
    </section>
  );
}
