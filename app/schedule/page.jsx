"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProgramPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const [activeMoment, setActiveMoment] = useState(null);

  const schedule = [
    {
      time: "1:30 pm",
      event: "Check-in",
      full: "1:30 pm – 3:00 pm",
      desc: "Registration and welcome",
    },
    {
      time: "3:00 pm",
      event: "Opening ceremony",
      full: "3:00 pm – 4:00 pm",
      desc: "Welcome address and introductions",
    },
    {
      time: "4:00 pm",
      event: "Panel discussion",
      full: "4:00 pm – 5:30 pm",
      desc: "Industry experts discuss future trends",
    },
    {
      time: "5:30 pm",
      event: "Hackathon launch",
      full: "5:30 pm – 6:30 pm",
      desc: "Kickoff and team formation",
    },
    {
      time: "6:30 pm",
      event: "Iftar",
      full: "6:30 pm – 7:30 pm",
      desc: "Sunset meal",
    },
    {
      time: "8:00 pm",
      event: "Round tables & workshop",
      full: "8:00 pm – 9:30 pm",
      desc: "Interactive sessions with experts",
    },
    {
      time: "9:30 pm",
      event: "Coffee + musical break",
      full: "9:30 pm – 10:00 pm",
      desc: "Refreshments and entertainment",
    },
    {
      time: "10:00 pm",
      event: "TRC game night",
      full: "10:00 pm – 11:30 pm",
      desc: "Team building activities",
    },
    {
      time: "11:30 pm",
      event: "Coffee break",
      full: "11:30 pm – 12:00 am",
      desc: "Midnight refreshments",
    },
    {
      time: "12:00 am",
      event: "Surprise activity",
      full: "12:00 am – 1:00 am",
      desc: "Something special awaits",
    },
    {
      time: "1:00 am",
      event: "Entertainment activities",
      full: "1:00 am – 4:30 am",
      desc: "Games and social time",
    },
    {
      time: "4:30 am",
      event: "Suhoor",
      full: "4:30 am – 5:00 am",
      desc: "Pre-dawn meal",
    },
    {
      time: "5:30 am",
      event: "Final hackathon part",
      full: "5:30 am – 8:00 am",
      desc: "Last coding sprint",
    },
    {
      time: "8:00 am",
      event: "Project submissions",
      full: "8:00 am – 10:00 am",
      desc: "Finalize and submit projects",
    },
    {
      time: "10:00 am",
      event: "Pitching session",
      full: "10:00 am – 12:30 pm",
      desc: "Teams present their solutions",
    },
    {
      time: "12:30 pm",
      event: "Jury discussion",
      full: "12:30 pm – 1:00 pm",
      desc: "Deliberation and judging",
    },
    {
      time: "1:00 pm",
      event: "Closing ceremony",
      full: "1:00 pm – 2:00 pm",
      desc: "Awards and farewell",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      <Navbar />

      <main
        ref={containerRef}
        className="relative min-h-screen bg-[#0a0f1f] overflow-hidden"
      >
        {/* Elegant Background with Depth */}
        <motion.div style={{ y: backgroundY }} className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#0e1427] to-[#121a30]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#efb073]/3 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4a6fa5]/3 rounded-full blur-3xl" />
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
                The Journey
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
                Program Schedule
              </h1>
              <p className="text-sm font-light text-white/40 max-w-md mt-6 leading-relaxed">
                24 hours of innovation, collaboration, and inspiration. Every
                moment crafted for an unforgettable experience.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 md:grid-cols-5 gap-4"
            >
              {[
                { number: "17", label: "Moments" },
                { number: "24h", label: "Non-Stop" },
                { number: "5+", label: "Activities" },
                { number: "∞", label: "Memories" },
                { number: "2", label: "Meals" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-light text-white/80">
                    {stat.number}
                  </div>
                  <div className="text-[10px] font-light tracking-wider text-white/30 uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Decorative line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {schedule.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative group"
                  onMouseEnter={() => setActiveMoment(idx)}
                  onMouseLeave={() => setActiveMoment(null)}
                >
                  <div
                    className={`
                    relative p-5 md:p-6 
                    bg-white/[0.02] backdrop-blur-sm 
                    border border-white/5 
                    transition-all duration-500 
                    hover:bg-white/[0.05] hover:border-white/10
                    ${
                      activeMoment === idx
                        ? "bg-white/[0.05] border-white/15"
                        : ""
                    }
                  `}
                  >
                    {/* Time indicator dot - visible on mobile and desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/10 border border-white/20 group-hover:bg-[#efb073]/30 group-hover:border-[#efb073]/50 transition-all duration-300 -mt-1.5 md:-mt-2 hidden md:block" />

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      {/* Time Column */}
                      <div className="md:w-1/3 md:text-right">
                        <div className="inline-block">
                          <div className="text-base md:text-lg font-light text-white/70">
                            {item.time}
                          </div>
                          <div className="text-[10px] md:text-xs font-light text-white/30 tracking-wider mt-0.5">
                            {item.full}
                          </div>
                        </div>
                      </div>

                      {/* Event Column */}
                      <div className="md:w-2/3 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:hidden" />

                        <div className="pl-4 md:pl-0">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-light text-white/90 tracking-tight">
                                {item.event}
                              </h3>
                              <p className="text-xs font-light text-white/40 mt-1 max-w-lg">
                                {item.desc}
                              </p>

                              {/* Mini expansion on hover */}
                              <motion.div
                                initial={false}
                                animate={{
                                  height: activeMoment === idx ? "auto" : 0,
                                  opacity: activeMoment === idx ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 mt-2 border-t border-white/5">
                                  <div className="flex items-center gap-4 text-[10px] font-light text-white/30">
                                    <span>
                                      Moment {idx + 1} of {schedule.length}
                                    </span>
                                    <span>•</span>
                                    <span>{item.full}</span>
                                  </div>
                                </div>
                              </motion.div>
                            </div>

                            {/* Event type indicator */}
                            <div className="w-1 h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-[#efb073]/30 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 right-3 w-3 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                    <div className="absolute top-3 right-3 w-px h-3 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                    <div className="absolute bottom-3 left-3 w-3 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                    <div className="absolute bottom-3 left-3 w-px h-3 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Key Moments Highlight */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-light text-white/80 mb-6 tracking-tight">
                Key Moments
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    time: "4:00 PM",
                    event: "Panel Discussion",
                    highlight: "Industry experts share insights",
                  },
                  {
                    time: "8:00 PM",
                    event: "Workshop",
                    highlight: "Hands-on learning with Amir Zouenkhi",
                  },
                  {
                    time: "10:00 AM",
                    event: "Pitching Session",
                    highlight: "Teams present innovative solutions",
                  },
                ].map((moment, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 bg-white/[0.02] border border-white/5"
                  >
                    <div className="text-xs font-light text-white/50 mb-2">
                      {moment.time}
                    </div>
                    <div className="text-base font-light text-white/80 mb-1">
                      {moment.event}
                    </div>
                    <div className="text-xs font-light text-white/30">
                      {moment.highlight}
                    </div>

                    {/* Small accent */}
                    <div className="absolute top-3 right-3 w-2 h-px bg-white/20" />
                    <div className="absolute top-3 right-3 w-px h-2 bg-white/20" />
                  </div>
                ))}
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-6 h-px bg-white/20" />
              <div className="absolute top-4 right-4 w-px h-6 bg-white/20" />
              <div className="absolute bottom-4 left-4 w-6 h-px bg-white/20" />
              <div className="absolute bottom-4 left-4 w-px h-6 bg-white/20" />
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/registration"
                className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-sm font-light text-white/80 flex items-center gap-3">
                  Secure Your Spot
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#efb073]/0 via-[#efb073]/5 to-[#efb073]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>
              <Link
                href="/speakers"
                className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-sm font-light text-white/80 flex items-center gap-3">
                  Meet Our Speakers
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#efb073]/0 via-[#efb073]/5 to-[#efb073]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>

              <Link
                href="/"
                className="px-8 py-4 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <span className="text-sm font-light text-white/40 hover:text-white/50">
                  Return Home
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer note */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-8">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-light tracking-wider text-white/20">
                {schedule.length} moments · 24 hours · 1 experience
              </span>
              <span className="text-[10px] font-light text-white/10">
                Times may be subject to change
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
