"use client";

const PHOTOS = [
  { src: "/images/photo1.jpg", ph: "✨" },
  { src: "/images/photo2.jpg", ph: "🌷" },
  { src: "/images/photo3.jpg", ph: "☀️" },
  { src: "/images/photo4.jpg", ph: "🌙" },
  { src: "/images/photo5.jpg", ph: "💫" },
];

function GalleryItem({ src, ph, feature }: { src: string; ph: string; feature?: boolean }) {
  return (
    <div className={`gallery-item relative overflow-hidden rounded-xl cursor-pointer ${feature ? "row-span-2" : "aspect-square"}`}
      style={{ background: "linear-gradient(135deg, #fde8e8, #e8e0f0)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).nextElementSibling?.setAttribute("style", "display:flex");
        }}
      />
      <div className="hidden absolute inset-0 items-center justify-center text-[2.5rem]">{ph}</div>
    </div>
  );
}

export default function GallerySection({ id }: { id: string }) {
  return (
    <section id={id} className="reveal py-24 px-6 relative z-[1]">
      <h2 className="font-serif-display font-normal text-center mb-10 text-[#3a2e2e]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
      >
        Moments worth keeping still.
      </h2>
      <div className="grid gap-4 max-w-3xl mx-auto"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto auto" }}
      >
        {/* Feature: bouquet spans 2 rows */}
        <GalleryItem src="/images/bouquet.jpg" ph="🌸" feature />
        {PHOTOS.map((p) => <GalleryItem key={p.src} src={p.src} ph={p.ph} />)}
      </div>
    </section>
  );
}
