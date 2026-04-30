"use client";
import { useState, useEffect, useCallback } from "react";

// No bouquet — 5 photos only
const ITEMS = [
  { src: "/images/photo1.png", ph: "✨", caption: "You & the fairy lights",   pos: "center center"  },
  { src: "/images/photo2.png", ph: "🧙", caption: "A Hogwarts story",         pos: "center center"  },
  { src: "/images/photo3.png", ph: "👑", caption: "Born to wear a crown",     pos: "center top"     },
  { src: "/images/photo4.png", ph: "🌸", caption: "Where it all began",       pos: "center center"  },
  { src: "/images/photo5.png", ph: "📖", caption: "Fourth Wing & golden hour", pos: "center 30%"     },
];

function GalleryItem({
  src, ph, caption, pos, style, onClick,
}: {
  src: string; ph: string; caption: string; pos: string;
  style?: React.CSSProperties; onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      onClick={onClick}
      className="gallery-item relative overflow-hidden rounded-xl cursor-pointer"
      style={{ background: "linear-gradient(135deg, #fde8e8, #e8e0f0)", ...style }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src} alt={caption}
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
      <div className="absolute inset-x-0 bottom-0 py-2 px-3 text-center
        font-serif-display italic text-[0.72rem] text-white
        bg-gradient-to-t from-[rgba(40,15,15,0.65)] to-transparent
        opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {caption}
      </div>
    </div>
  );
}

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
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 text-white text-base flex items-center justify-center hover:bg-white/40 transition-colors"
        >✕</button>
      </div>
    </div>
  );
}

export default function GallerySection({ id }: { id: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  const open = (i: number) => setLightbox({ src: ITEMS[i].src, caption: ITEMS[i].caption });

  return (
    <>
      <section id={id} className="snap-section reveal flex-col px-4"
        style={{ background: "radial-gradient(ellipse at 50% 50%, #fdf6ee 50%, #fde8e8 100%)" }}
      >
        <h2 className="font-serif-display font-normal text-center mb-5 text-[#3a2e2e]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Moments worth keeping still.
        </h2>

        {/*
          5-photo bento grid:
          Row 1 (220px): [photo1 wide col1-2]  [photo2 col3]
          Row 2 (220px): [photo3 col1] [photo4 col2] [photo5 col3]
        */}
        <div
          className="w-full"
          style={{
            maxWidth: "780px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "220px 220px",
            gap: "10px",
          }}
        >
          {/* photo1 — row1, col1-2 wide */}
          <GalleryItem {...ITEMS[0]} style={{ gridColumn: "1 / 3" }} onClick={() => open(0)} />

          {/* photo2 — row1, col3 */}
          <GalleryItem {...ITEMS[1]} onClick={() => open(1)} />

          {/* photo3 — row2, col1 */}
          <GalleryItem {...ITEMS[2]} onClick={() => open(2)} />

          {/* photo4 — row2, col2 */}
          <GalleryItem {...ITEMS[3]} onClick={() => open(3)} />

          {/* photo5 — row2, col3 */}
          <GalleryItem {...ITEMS[4]} onClick={() => open(4)} />
        </div>
      </section>

      {lightbox && (
        <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
