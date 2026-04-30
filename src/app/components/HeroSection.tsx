"use client";

export default function HeroSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="snap-section">
      {/* Animated background */}
      <div className="hero-bg absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #fde8e8 0%, #fdf6ee 45%, #e8e0f0 100%)" }}
      />

      {/* Content: two-column on desktop, stacked on mobile */}
      <div className="relative z-[2] w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

        {/* ── LEFT: Text ── */}
        <div className="text-center md:text-left flex-1 order-2 md:order-1">
          <p className="fade-up-1 font-body text-xs tracking-[0.28em] text-[#c9a96e] mb-4">— for you —</p>
          <h1 className="fade-up-2 font-serif-display font-light leading-[1.1] text-[#3a2e2e]"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            Happy 24th<br /><em className="text-[#c9a96e]">Birthday</em>
          </h1>
          <p className="fade-up-3 font-serif-display text-[#8a7a7a] my-5 leading-[1.75]"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)" }}
          >
            Some people don't just enter life…<br />they make it feel brighter.
          </p>
          <button onClick={onOpen}
            className="fade-up-4 inline-block px-10 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-sm tracking-widest cursor-pointer rounded-sm transition-all hover:bg-[#c9a96e] hover:text-white"
          >
            Open Your Letter
          </button>
        </div>

        {/* ── RIGHT: Bouquet ── */}
        <div className="fade-up-2 relative order-1 md:order-2 flex-shrink-0"
          style={{ width: "clamp(220px, 32vw, 380px)" }}
        >
          {/* Soft glow ring */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(244,194,194,0.5) 0%, rgba(201,169,110,0.15) 55%, transparent 75%)",
              transform: "scale(1.15)",
              filter: "blur(18px)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bouquet.png"
            alt="Birthday bouquet"
            className="relative z-[1] w-full"
            style={{
              borderRadius: "50% 50% 46% 46%",
              boxShadow: "0 24px 60px rgba(200,140,100,0.22), 0 4px 20px rgba(200,140,100,0.12)",
              aspectRatio: "1 / 1.1",
              objectFit: "cover",
              objectPosition: "center top",
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const next = el.nextElementSibling as HTMLElement;
              if (next) next.style.display = "flex";
            }}
          />
          <div className="hidden absolute inset-0 z-[1] items-center justify-center text-[6rem]">🌸</div>

          {/* Floating sparkle dots */}
          <div className="absolute top-4 right-2 w-2 h-2 rounded-full bg-[#c9a96e] opacity-60 animate-pulse" />
          <div className="absolute bottom-8 left-3 w-1.5 h-1.5 rounded-full bg-[#f4c2c2] opacity-70 animate-pulse" style={{ animationDelay: "0.7s" }} />
          <div className="absolute top-1/3 -left-4 w-1 h-1 rounded-full bg-[#c9a96e] opacity-50 animate-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
      </div>

      <div className="bounce-arrow absolute bottom-6 left-1/2 text-[#c9a96e] text-xl z-[2]">↓</div>
    </section>
  );
}
