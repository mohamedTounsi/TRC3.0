"use client";
import React from "react";

export default function TRCIntro() {
  return (
    <section
      className="relative w-full h-[65vh] md:h-[50vh] flex items-center justify-center overflow-hidden py-20"
      style={{ fontFamily: '"Great Vibes", cursive' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover brightness-90"
        style={{
          backgroundImage: `url('/ambassador1.png')`,
        }}
      ></div>

      {/* Mobile Image Override */}
      <div
        className="absolute inset-0 bg-center bg-cover brightness-90 md:hidden"
        style={{
          backgroundImage: `url('/ambassador2.png')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Register Button */}
      <button
        className="
          absolute left-1/2 -translate-x-1/2
          top-[80%] md:top-[75%] 
          px-8 py-2
          border border-[#9d927d]
          text-[#9d927d]
          tracking-wide
          rounded-md
          transition-all duration-300 ease-in-out
          hover:bg-[#9d927d]
          hover:text-white
          hover:shadow-lg hover:shadow-[#9d927d]/40
          cursor-pointer
        "
        style={{ fontFamily: '"Inter", sans-serif', fontWeight: 200 }}
      >
        <a href="https://forms.gle/rBn7uh7c1yX146uG9">Register</a>
      </button>
    </section>
  );
}
