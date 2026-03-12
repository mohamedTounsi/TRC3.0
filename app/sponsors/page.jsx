"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const sponsors = [
  { name: "BIAT", logo: "/sponsors/biatbg.png", website: "#", rank: "Other" },
  {
    name: "Amandine",
    logo: "/sponsors/am.png",
    website: "#",
    rank: "Gold",
  },
  { name: "SLS", logo: "/sponsors/slsbg.png", website: "#", rank: "Gold" },
  {
    name: "TechLine",
    logo: "/sponsors/techline-Photoroom.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Société Régim",
    logo: "/sponsors/regimbg.png",
    website: "#",
    rank: "Silver",
  },
  {
    name: "Walima",
    logo: "/sponsors/walimabgbg.png",
    website: "#",
    rank: "Platinum",
  },
  {
    name: "Emprint ID",
    logo: "/sponsors/id-Photoroom.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Mme Gharbi",
    logo: "/sponsors/gharbibg.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Azar Gaming",
    logo: "/sponsors/azarbg.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "T2ST",
    logo: "/sponsors/t2st-Photoroom.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Chef Ali",
    logo: "/sponsors/chefalibg.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Lys Event",
    logo: "/sponsors/lys-Photoroom.png",
    website: "#",
    rank: "Bronze",
  },
  {
    name: "Café d'Or",
    logo: "/sponsors/cafedorbg.png",
    website: "#",
    rank: "Platinum",
  },
  {
    name: "IEEE Foundation",
    logo: "/sponsors/ieeefoundation-Photoroom.png",
    website: "#",
    rank: "Bronze",
  },

  {
    name: "Université Sfax",
    logo: "/sponsors/sfax.png",
    website: "#",
    rank: "Other",
  },
  {
    name: "Miracl lab",
    logo: "/sponsors/mirack-Photoroom.png",
    website: "#",
    rank: "Other",
  },
];

const RANK_ORDER = ["Platinum", "Gold", "Silver", "Bronze", "Other"];

// Color config only for shields and text accents
const RANK_CONFIG = {
  Platinum: {
    label: "Platinum",
    text: "#ffffff",
    accent: "#a8c8ef",
    shieldGlow: "rgba(168,200,239,0.6)",
  },
  Gold: {
    label: "Gold",
    text: "#ffd700",
    accent: "#ffd700",
    shieldGlow: "rgba(255,215,0,0.5)",
  },
  Silver: {
    label: "Silver",
    text: "#c0c0c0",
    accent: "#c0c0c0",
    shieldGlow: "rgba(192,192,192,0.4)",
  },
  Bronze: {
    label: "Bronze",
    text: "#cd7f32",
    accent: "#cd7f32",
    shieldGlow: "rgba(205,127,50,0.3)",
  },
  Other: {
    label: "Other",
    text: "#9ca3af",
    accent: "#9ca3af",
    shieldGlow: "rgba(156,163,175,0.3)",
  },
};

// White shield with colored glow (based on rank)
function RankShield({ rank }) {
  const cfg = RANK_CONFIG[rank];

  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 12px ${cfg.shieldGlow})` }}
    >
      <defs>
        <linearGradient id={`shield-grad-${rank}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.7)" />
        </linearGradient>
      </defs>

      {/* White shield */}
      <path
        d="M24 2 L44 10 L44 28 C44 40 34 50 24 54 C14 50 4 40 4 28 L4 10 Z"
        fill="url(#shield-grad-Platinum)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
      />

      {/* Rank letter */}
      <text
        x="24"
        y="35"
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fontFamily="Georgia, serif"
        fill={cfg.accent}
        letterSpacing="0"
      >
        {rank === "Other" ? "O" : rank[0]}
      </text>
    </svg>
  );
}

// Section label for each tier
function TierDivider({ rank }) {
  const cfg = RANK_CONFIG[rank];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-8 mt-2"
    >
      <RankShield rank={rank} />
      <div>
        <span
          className="text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ color: cfg.text }}
        >
          {cfg.label}
        </span>
        <div
          className="h-px w-24 mt-1 opacity-40"
          style={{
            background: `linear-gradient(90deg, ${cfg.text}, transparent)`,
          }}
        />
      </div>
      <div
        className="flex-1 h-px opacity-10"
        style={{
          background: `linear-gradient(90deg, ${cfg.text}, transparent)`,
        }}
      />
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Grid columns per tier
const TIER_COLS = {
  Platinum: "grid-cols-1 sm:grid-cols-2",
  Gold: "grid-cols-2 sm:grid-cols-2",
  Silver: "grid-cols-2 sm:grid-cols-3",
  Bronze: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  Other: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

// Uniform square card size
const CARD_SIZE = {
  Platinum: "h-64",
  Gold: "h-56",
  Silver: "h-52",
  Bronze: "h-48",
  Other: "h-48",
};

// Uniform white card styling for all ranks
const WHITE_CARD_STYLE = {
  background: "rgba(255, 255, 255, 0.03)",
  backgroundHover: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.1)",
  borderHover: "rgba(255, 255, 255, 0.2)",
  glow: "rgba(255, 255, 255, 0.15)",
  glowHover: "rgba(255, 255, 255, 0.25)",
};

export default function SponsorsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const grouped = RANK_ORDER.reduce((acc, rank) => {
    acc[rank] = sponsors.filter((s) => s.rank === rank);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <main
        ref={containerRef}
        className="relative min-h-screen bg-[#0a0f1f] overflow-hidden"
      >
        {/* Background */}
        <motion.div style={{ y: backgroundY }} className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#0e1427] to-[#121a30]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </motion.div>

        {/* Header */}
        <div className="relative pt-32 pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-light tracking-[0.3em] text-white/40 uppercase">
                Support
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
                Our Sponsors
              </h1>
              <p className="text-sm font-light text-white/40 max-w-md mt-6 leading-relaxed">
                Organizations supporting innovation and empowering the next
                generation of engineers.
              </p>

              {/* Tier legend */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                {RANK_ORDER.map((rank) => {
                  const cfg = RANK_CONFIG[rank];
                  return (
                    <div key={rank} className="flex items-center gap-2">
                      <RankShield rank={rank} />
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase font-light"
                        style={{ color: cfg.text }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tiers */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-32 space-y-20">
          <div className="max-w-7xl mx-auto">
            {RANK_ORDER.map((rank) => {
              const tier = grouped[rank];
              if (!tier || tier.length === 0) return null;
              const cfg = RANK_CONFIG[rank];

              return (
                <div key={rank} className="mb-16">
                  <TierDivider rank={rank} />

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid ${TIER_COLS[rank]} gap-6`}
                  >
                    {tier.map((sponsor, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group"
                      >
                        <Link
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div
                            className={`relative flex flex-col items-center justify-center ${CARD_SIZE[rank]} w-full backdrop-blur-sm transition-all duration-500 rounded-lg`}
                            style={{
                              background: WHITE_CARD_STYLE.background,
                              border: `1px solid ${WHITE_CARD_STYLE.border}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                WHITE_CARD_STYLE.backgroundHover;
                              e.currentTarget.style.borderColor =
                                WHITE_CARD_STYLE.borderHover;
                              e.currentTarget.style.boxShadow = `0 0 40px ${WHITE_CARD_STYLE.glowHover}`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                WHITE_CARD_STYLE.background;
                              e.currentTarget.style.borderColor =
                                WHITE_CARD_STYLE.border;
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {/* Corner accent lines - now white with rank color on hover */}
                            <div
                              className="absolute top-3 left-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                borderTop: `1px solid ${cfg.text}`,
                                borderLeft: `1px solid ${cfg.text}`,
                              }}
                            />
                            <div
                              className="absolute bottom-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                borderBottom: `1px solid ${cfg.text}`,
                                borderRight: `1px solid ${cfg.text}`,
                              }}
                            />

                            {/* Rank badge top-right */}
                            <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                              <RankShield rank={rank} />
                            </div>

                            {/* Logo container - uniform square */}
                            <div className="w-36 h-36 flex items-center justify-center mb-2">
                              <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="max-w-full max-h-full object-contain filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                              />
                            </div>

                            {/* Sponsor name */}
                            <span
                              className="text-[10px] tracking-[0.2em] uppercase font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 left-0 right-0 text-center"
                              style={{ color: cfg.text }}
                            >
                              {sponsor.name}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Counter */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-16">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex items-center gap-6">
            <span className="text-[10px] font-light tracking-wider text-white/20">
              {sponsors.length} Sponsors
            </span>
            {RANK_ORDER.map((rank) => (
              <span
                key={rank}
                className="text-[10px] font-light tracking-wider"
                style={{ color: RANK_CONFIG[rank].text, opacity: 0.5 }}
              >
                {grouped[rank]?.length || 0} {rank}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
