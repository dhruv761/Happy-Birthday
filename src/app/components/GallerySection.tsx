"use client";
import { useState, useEffect, useCallback } from "react";

const ITEMS = [
  { src: "/images/bouquet.png",  ph: "🌸", caption: "For you",            feature: true },
  { src: "/images/photo1.png",   ph: "✨", caption: "You & the fairy lights" },
  { src: "/images/photo2.png",   ph: "🧙", caption: "A Hogwarts story"       },
  { src: "/images/photo3.png",   ph: "👑", caption: "Born to wear a crown"   },
  { src: "/images/photo4.png",   ph: "🌸", caption: "Where it all began"     },
  { src: "/images/photo5.png",   ph: "🌿", caption: "Golden hour"            },
];

function GalleryItem({
  src, ph, caption, feature, onClick,
}: {
  src: string; ph: string; caption: string; feature?: boolean; onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      onClick={onClick}
      className="gallery-item relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #fde8e8, #e8e0f0)",
        gridRow: feature ? "span 2" : undefined,
      }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src} alt={caption}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">{ph}</span>
          <span className="font-serif-display italic text-xs text-[#8a7a7a] px-2 text-center">{caption}</span>
        </div>
      )}
      {/* Caption overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 py-2 px-3 text-center
        font-serif-display italic text-[0.75rem] text-white
        bg-gradient-to-t from-[rgba(50,20,20,0.6)] to-transparent
        opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {caption}
      </div>
    </div>
  );
}

/* ── Lightbox ── */
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
        <p className="font-serif-display italic text-white/80 text-sm">{caption}</p>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 text-white text-lg flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function GallerySection({ id }: { id: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  return (
    <>
      <section id={id} className="snap-section reveal flex-col px-4"
        style={{ background: "radial-gradient(ellipse at 40% 60%, #fdf6ee 50%, #fde8e8 100%)" }}
      >
        <h2 className="font-serif-display font-normal text-center mb-5 text-[#3a2e2e]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
        >
          Moments worth keeping still.
        </h2>

        {/*
          Layout (6 items):
          col1=bouquet(rowspan2) | col2=photo1 | col3=photo2
          col1=bouquet(cont.)    | col2=photo3 | col3=photo4
          col1=photo5(colspan3 centered)
        */}
        <div
          className="w-full"
          style={{
            maxWidth: "760px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "180px 180px 140px",
            gap: "10px",
          }}
        >
          {/* Bouquet — feature, spans 2 rows */}
          <GalleryItem {...ITEMS[0]} onClick={() => setLightbox({ src: ITEMS[0].src, caption: ITEMS[0].caption })} />

          {/* Photo 1 — row1 col2 */}
          <GalleryItem {...ITEMS[1]} onClick={() => setLightbox({ src: ITEMS[1].src, caption: ITEMS[1].caption })} />

          {/* Photo 2 — row1 col3 */}
          <GalleryItem {...ITEMS[2]} onClick={() => setLightbox({ src: ITEMS[2].src, caption: ITEMS[2].caption })} />

          {/* Photo 3 — row2 col2 */}
          <GalleryItem {...ITEMS[3]} onClick={() => setLightbox({ src: ITEMS[3].src, caption: ITEMS[3].caption })} />

          {/* Photo 4 — row2 col3 */}
          <GalleryItem {...ITEMS[4]} onClick={() => setLightbox({ src: ITEMS[4].src, caption: ITEMS[4].caption })} />

          {/* Photo 5 — row3, spans all 3 cols */}
          <div
            className="gallery-item relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              gridColumn: "1 / -1",
              background: "linear-gradient(135deg, #fde8e8, #e8e0f0)",
            }}
            onClick={() => setLightbox({ src: ITEMS[5].src, caption: ITEMS[5].caption })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ITEMS[5].src} alt={ITEMS[5].caption} className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.setAttribute("style", "display:flex");
              }}
            />
            <div className="hidden w-full h-full items-center justify-center text-4xl">{ITEMS[5].ph}</div>
            <div className="absolute inset-x-0 bottom-0 py-2 px-3 text-center font-serif-display italic text-[0.75rem] text-white bg-gradient-to-t from-[rgba(50,20,20,0.6)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {ITEMS[5].caption}
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}
