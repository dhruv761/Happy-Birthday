"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const ITEMS = [
  { src: "/images/photo1.png", ph: "✨", caption: "You & the fairy lights",    pos: "center center" },
  { src: "/images/photo2.png", ph: "🧙", caption: "A Hogwarts story",          pos: "center center" },
  { src: "/images/photo3.png", ph: "👑", caption: "Born to wear a crown",      pos: "center top"    },
  { src: "/images/photo4.png", ph: "🌸", caption: "Where it all began",        pos: "center center" },
  { src: "/images/photo5.png", ph: "📖", caption: "Fourth Wing & golden hour", pos: "center 30%"    },
];

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="relative flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption} className="lightbox-img" />
        <p className="font-serif-display italic text-white/75 text-sm">{caption}</p>
        <button onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 text-white text-base flex items-center justify-center hover:bg-white/40 transition-colors"
        >✕</button>
      </div>
    </div>
  );
}

// ── Single Gallery Item with Curtain ─────────────────────
function GalleryItem({
  src, ph, caption, pos, delay, revealed, gridStyle, onClick,
}: {
  src: string; ph: string; caption: string; pos: string;
  delay: number; revealed: boolean;
  gridStyle?: React.CSSProperties; onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const open = revealed;

  return (
    <div
      onClick={onClick}
      className="gallery-item relative overflow-hidden rounded-xl cursor-pointer select-none"
      style={{ background: "linear-gradient(135deg, #fde8e8, #e8e0f0)", ...gridStyle }}
    >
      {/* ── Photo ── */}
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={caption}
          className="w-full h-full object-cover"
          style={{ objectPosition: pos }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">{ph}</span>
          <span className="font-serif-display italic text-xs text-[#8a7a7a] px-2 text-center">{caption}</span>
        </div>
      )}

      {/* ── Caption hover overlay ── */}
      <div className="absolute inset-x-0 bottom-0 py-2 px-3 text-center font-serif-display italic text-[0.72rem] text-white bg-gradient-to-t from-[rgba(40,15,15,0.65)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        {caption}
      </div>

      {/* ── LEFT curtain panel ── */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-10"
        style={{
          background: "linear-gradient(160deg, #fdf1e8 0%, #f4c2c2 60%, #e8d8f0 100%)",
          transform: open ? "translateX(-100%)" : "translateX(0)",
          transition: `transform 1s cubic-bezier(0.77,0,0.175,1) ${delay}ms`,
        }}
      >
        {/* Subtle sheen stripe */}
        <div className="absolute inset-y-0 right-0 w-[2px]"
          style={{ background: "linear-gradient(180deg, transparent, rgba(201,169,110,0.6), transparent)" }}
        />
      </div>

      {/* ── RIGHT curtain panel ── */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-10"
        style={{
          background: "linear-gradient(200deg, #e8d8f0 0%, #f4c2c2 40%, #fdf1e8 100%)",
          transform: open ? "translateX(100%)" : "translateX(0)",
          transition: `transform 1s cubic-bezier(0.77,0,0.175,1) ${delay}ms`,
        }}
      >
        {/* Subtle sheen stripe */}
        <div className="absolute inset-y-0 left-0 w-[2px]"
          style={{ background: "linear-gradient(180deg, transparent, rgba(201,169,110,0.6), transparent)" }}
        />
      </div>

      {/* ── Center seam (gold line that fades as curtains open) ── */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px z-[11]"
        style={{
          background: "linear-gradient(180deg, transparent 5%, rgba(201,169,110,0.8) 30%, rgba(201,169,110,0.8) 70%, transparent 95%)",
          opacity: open ? 0 : 1,
          transition: `opacity 0.4s ease ${delay + 300}ms`,
        }}
      />

      {/* ── Bow / ribbon knot at center ── */}
      <div
        className="absolute top-1/2 left-1/2 z-[12] flex items-center justify-center"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: open ? 0 : 1,
          transition: `opacity 0.3s ease ${delay}ms`,
          fontSize: "1.1rem",
        }}
      >
        🎀
      </div>
    </div>
  );
}

// ── Main Gallery Section ──────────────────────────────────
export default function GallerySection({ id }: { id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Small delay so user sees the curtains before they open
        setTimeout(() => setRevealed(true), 400);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const open = (i: number) => setLightbox({ src: ITEMS[i].src, caption: ITEMS[i].caption });

  return (
    <>
      <section id={id} ref={sectionRef} className="snap-section reveal flex-col px-4"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #fdf6ee 50%, #fde8e8 100%)" }}
      >
        <h2 className="font-serif-display font-normal text-center mb-5 text-[#3a2e2e]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Moments worth keeping still.
        </h2>

        {/*
          5-photo bento:
          Row 1 (220px): [photo1 wide col1-2] [photo2 col3]
          Row 2 (220px): [photo3 col1] [photo4 col2] [photo5 col3]
        */}
        <div className="w-full" style={{
          maxWidth: "780px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "220px 220px",
          gap: "10px",
        }}>
          <GalleryItem {...ITEMS[0]} delay={0}   revealed={revealed} gridStyle={{ gridColumn: "1 / 3" }} onClick={() => open(0)} />
          <GalleryItem {...ITEMS[1]} delay={150}  revealed={revealed} onClick={() => open(1)} />
          <GalleryItem {...ITEMS[2]} delay={300}  revealed={revealed} onClick={() => open(2)} />
          <GalleryItem {...ITEMS[3]} delay={450}  revealed={revealed} onClick={() => open(3)} />
          <GalleryItem {...ITEMS[4]} delay={600}  revealed={revealed} onClick={() => open(4)} />
        </div>
      </section>

      {lightbox && (
        <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
