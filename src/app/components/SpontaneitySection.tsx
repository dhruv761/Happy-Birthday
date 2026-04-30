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
  const lastRef = { current: -1 };

  const surprise = () => {
    let idx;
    do { idx = Math.floor(Math.random() * SURPRISES.length); } while (idx === lastRef.current);
    lastRef.current = idx;
    setVisible(false);
    setTimeout(() => { setText(SURPRISES[idx]); setVisible(true); }, 80);
  };

  return (
    <section id={id} className="reveal py-24 px-6 text-center relative z-[1]">
      <h2 className="font-serif-display font-normal text-center mb-10 text-[#3a2e2e]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
      >
        A little nudge for today
      </h2>
      <button onClick={surprise}
        className="px-9 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-sm tracking-widest cursor-pointer rounded-sm transition-all hover:bg-[#c9a96e] hover:text-white"
      >
        Click for a surprise ✨
      </button>
      <div className={`surprise-card max-w-sm mx-auto mt-8 px-10 py-8 bg-white border border-[rgba(201,169,110,0.3)] rounded-2xl font-serif-display italic text-[1.25rem] text-[#3a2e2e] shadow-[0_10px_40px_rgba(201,169,110,0.12)] flex items-center justify-center min-h-[80px] ${visible && text ? "show" : ""}`}>
        {text}
      </div>
    </section>
  );
}
