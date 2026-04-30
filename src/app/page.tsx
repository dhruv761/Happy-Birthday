"use client";
import { useEffect, useRef } from "react";
import PetalsCanvas from "./components/PetalsCanvas";
import ConfettiCanvas, { ConfettiRef } from "./components/ConfettiCanvas";
import SoundButton from "./components/SoundButton";
import HeroSection from "./components/HeroSection";
import LetterSection from "./components/LetterSection";
import AboutSection from "./components/AboutSection";
import EnergyMeter from "./components/EnergyMeter";
import GallerySection from "./components/GallerySection";
import SpontaneitySection from "./components/SpontaneitySection";
import ClosingSection from "./components/ClosingSection";

export default function Home() {
  const confettiRef = useRef<ConfettiRef>(null);

  // Intersection observer for .reveal sections
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToLetter = () => {
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PetalsCanvas />
      <ConfettiCanvas ref={confettiRef} />
      <SoundButton />
      <main>
        <HeroSection onOpen={scrollToLetter} />
        <LetterSection id="letter" />
        <AboutSection id="about" />
        <EnergyMeter id="energy" onMax={() => confettiRef.current?.launch()} />
        <GallerySection id="gallery" />
        <SpontaneitySection id="spontaneity" />
        <ClosingSection id="closing" />
      </main>
    </>
  );
}
