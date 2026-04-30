"use client";
import { useState } from "react";

const SURPRISES = [
  "Go for a midnight drive 🚗",
  "Read a fantasy chapter in silence 📚",
  "Make coffee and do nothing for 10 minutes ☕",
  "Do something completely unplanned today 🌙",
  "Call someone you haven't spoken to in a while 💌",
  "Take a long walk without a destination 🌿",
];

export default function SpontaneitySection({ id }: { id: string }) {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const lastIdx = { current: -1 };

  const surprise = () => {
    let idx;
    do { idx = Math.floor(Math.random() * SURPRISES.length); } while (idx === lastIdx.current);
    lastIdx.current = idx;
    setVisible(false);
    setTimeout(() => { setText(SURPRISES[idx]); setVisible(true); }, 80);
  };

  return (
    <section id={id} className="snap-section reveal flex-col text-center px-6"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #fdf6ee 60%, #e8f0f0 100%)" }}
    >
      <h2 className="font-serif-display font-normal mb-8 text-[#3a2e2e]"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
      >
        A little nudge for today
      </h2>
      <button onClick={surprise}
        className="px-9 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-sm tracking-widest cursor-pointer rounded-sm transition-all hover:bg-[#c9a96e] hover:text-white"
      >
        Click for a surprise ✨
      </button>
      <div className={`surprise-card mt-8 px-10 py-8 bg-white border border-[rgba(201,169,110,0.3)] rounded-2xl font-serif-display italic text-[1.2rem] text-[#3a2e2e] shadow-[0_10px_40px_rgba(201,169,110,0.12)] flex items-center justify-center ${visible && text ? "show" : ""}`}
        style={{ minHeight: "80px", maxWidth: "420px" }}
      >
        {text}
      </div>
    </section>
  );
}
