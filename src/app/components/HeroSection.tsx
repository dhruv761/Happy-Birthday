"use client";

export default function HeroSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-[1]">
      {/* Background */}
      <div className="hero-bg absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 30% 40%, #fde8e8 0%, #fdf6ee 40%, #e8e0f0 80%, #fdf6ee 100%)" }}
      />

      {/* Bouquet drop */}
      <div className="bouquet-anim absolute top-0 left-1/2 z-[3]"
        style={{ transform: "translateX(-50%) translateY(-120%)", width: "clamp(120px, 18vw, 200px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bouquet.png"
          alt="Bouquet"
          className="w-full rounded-[50%_50%_40%_40%] shadow-[0_12px_40px_rgba(200,140,100,0.25)]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).nextElementSibling?.setAttribute("style", "display:flex");
          }}
        />
        <div className="hidden items-center justify-center w-full aspect-square text-[5rem] bg-white/40 rounded-full">🌸</div>
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-6 mt-28">
        <p className="fade-up-1 font-body text-xs tracking-[0.25em] text-[#c9a96e] mb-5">— for you —</p>
        <h1 className="fade-up-2 font-serif-display font-light leading-[1.1] text-[#3a2e2e]"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          Happy 24th<br /><em className="text-[#c9a96e]">Birthday</em>
        </h1>
        <p className="fade-up-3 font-serif-display text-[#8a7a7a] my-5 leading-[1.7]"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}
        >
          Some people don't just enter life…<br />they make it feel brighter.
        </p>
        <button
          onClick={onOpen}
          className="fade-up-4 inline-block px-9 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-sm tracking-widest cursor-pointer rounded-sm transition-all hover:bg-[#c9a96e] hover:text-white"
        >
          Open Your Letter
        </button>
      </div>

      <div className="bounce-arrow absolute bottom-6 left-1/2 text-[#c9a96e] text-xl z-[2]">↓</div>
    </section>
  );
}
