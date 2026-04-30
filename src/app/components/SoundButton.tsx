"use client";
import { useState, useRef } from "react";

export default function SoundButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const audio = audioRef.current!;
    if (audio.paused) { audio.play().catch(() => {}); setPlaying(true); }
    else { audio.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        title="Toggle music"
        className={`fixed top-4 right-4 z-[1000] w-10 h-10 rounded-full border text-sm cursor-pointer backdrop-blur-md transition-all ${
          playing
            ? "bg-[#c9a96e] text-white border-[#c9a96e]"
            : "bg-white/50 text-[#c9a96e] border-[#c9a96e] hover:bg-white/80"
        }`}
      >
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}
