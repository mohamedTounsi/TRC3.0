"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const partners = [
  {
    name: "IAS Tunisia Section Chapter",
    logo: "/partners/ias.webp",
    description:
      "A local chapter of the Industry Applications Society, focused on advancing industrial and commercial electrical engineering, automation, power systems and real‑world tech innovation.",
    website: "https://ias.ieee.tn/",
    category: "Academic Partner",
    since: "2020",
  },
  {
    name: "IES Tunisia Section Chapter",
    logo: "/partners/ies.webp",
    description:
      "A local unit of the Industrial Electronics Society promoting learning and innovation in electronics for industrial systems, automation, robotics and controls.",
    website: "https://ies.ieee.tn/",
    category: "Strategic Partner",
    since: "2021",
  },
  {
    name: "PES Tunisia Section Chapter",
    logo: "/partners/pes.png",
    description:
      "A chapter of the global Power & Energy Society focused on education, networking, and technical exchange in power systems, energy technologies and grid engineering.",
    website: "https://pes.ieee.tn/",
    category: "Ecosystem Partner",
    since: "2022",
  },
  {
    name: "Sight Tunisia Section Group",
    logo: "/partners/sight.svg",
    description:
      "A volunteer‑driven network that uses engineering and technology to address community and humanitarian challenges locally.",
    website: "https://sight.ieee.tn/",
    category: "Ecosystem Partner",
    since: "2022",
  },
  {
    name: "WIE Tunisia Section AG",
    logo: "/partners/wie.png",
    description:
      "A group that empowers and supports women in science, technology, engineering, and math (STEM), encouraging leadership and inclusion in engineering fields.",
    website: "https://wie.ieee.tn/",
    category: "Affinity Group",
    since: "2022",
  },
  {
    name: "Aess Tunisia Section Chapter",
    logo: "/partners/aess.png",
    description:
      "A chapter dedicated to aerospace, defense, radar, navigation and electronic systems fields, offering activities, mentorships and knowledge sharing.",
    website: "https://aess.ieee.tn/",
    category: "Ecosystem Partner",
    since: "2022",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function PartnersPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Navbar />

      <main
        ref={containerRef}
        className="relative min-h-screen bg-[#0a0f1f] overflow-hidden"
      >
        {/* Elegant Background with Depth - Darker */}
        <motion.div style={{ y: backgroundY }} className="fixed inset-0 -z-10">
          {/* Base gradient - darker and more sophisticated */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#0e1427] to-[#121a30]" />

          {/* Subtle light orbs - more muted */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#efb073]/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4a6fa5]/3 rounded-full blur-3xl" />

          {/* Fine grid overlay - more subtle */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(239, 176, 115, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(239, 176, 115, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </motion.div>

        {/* Header Section */}
        <div className="relative pt-32 pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-light tracking-[0.3em] text-white/40 uppercase">
                Network
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
                Strategic Partners
              </h1>
              <p className="text-sm font-light text-white/40 max-w-md mt-6 leading-relaxed">
                Collaborating with distinguished organizations to advance
                technological innovation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative px-6 sm:px-12 lg:px-24 pb-32"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative h-full"
              >
                {/* Card with refined styling - darker */}
                <div className="relative h-full p-8 bg-white/[0.03] backdrop-blur-sm border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 flex flex-col">
                  {/* Logo Container - White logos always */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Logo with white filter */}
                      <div className="relative w-40 h-28 flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-16 max-w-[140px] object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col space-y-4">
                    {/* Category and Year */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-light tracking-[0.2em] text-white/30 uppercase">
                        {partner.category}
                      </span>
                      <span className="text-[10px] font-light text-white/20">
                        {partner.since}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-light text-white/80 leading-relaxed">
                      {partner.name}
                    </h2>

                    {/* Description */}
                    <p className="text-xs font-light text-white/40 leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Explore Link with Arrow */}
                    <div className="pt-4 mt-auto">
                      <Link
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-xs font-light text-white/60 hover:text-white/90 transition-all duration-300 group/link"
                      >
                        <span>Explore Partner</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 20h16"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Corner accents - more subtle */}
                  <div className="absolute top-4 right-4 w-4 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 w-px h-4 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 w-4 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 w-px h-4 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Section */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-16">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-8">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-light tracking-wider text-white/20">
                {partners.length} Partners
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
