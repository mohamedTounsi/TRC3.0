"use client";
import React from "react";

export default function TRCIntro() {
  return (
    <section
      className="relative h-[0vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden"
      style={{ fontFamily: '"Great Vibes", cursive' }}
    >
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px] brightness-90"
        style={{ backgroundImage: "url('/whatis1.jpg')" }}
      ></div>

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/25"></div>
    </section>
  );
}
