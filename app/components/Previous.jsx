"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const editions = [
  {
    id: 1,
    year: "2024",
    title: "TRC 1.0",
    description:
      "TRC 1.0 – HealthTech Harmony (2024) was the first TechResolve Challenge, gathering over 120 participants for a non-technical hackathon focused on IT solutions for health and well-being, featuring AI workshops and a conference on modern healthcare challenges.",
    image: "/logos/logotrc11.png",
    theme: "HealthTech Harmony",
    location: "ISIMS, Sfax",
    date: "March 18-19, 2024",
    stats: [
      { number: "+120", label: "Participants" },
      { number: "8", label: "Projects" },
      { number: "3", label: "Awards" },
    ],
    highlights: [
      "24-Hour Hackathon",
      "AI workshops by experts",
      "HealthTech focus",
      "Health challenges talk",
    ],
  },
  {
    id: 2,
    year: "2025",
    title: "TRC 2.0",
    description:
      "TRC 2.0 – Sustainable Cities & Communities (2025) was the second edition of the TechResolve Challenge, held on 24–25 March 2025 at ISIMS, gathering around 250 participants for an AI-focused hackathon addressing industrial and societal challenges, with preparatory bootcamps, expert workshops, and a challenge to build AI-driven solutions.",
    image: "/logos/logotrc21.png",
    theme: "Sustainable Cities & Communities",
    location: "ISIMS, Sfax",
    date: "March 24-25, 2025",
    stats: [
      { number: "250", label: "Participants" },
      { number: "25", label: "Projects" },
      { number: "5", label: "Awards" },
    ],
    highlights: [
      "24-Hour Hackathon",
      "3 AI bootcamps",
      "Expert Panels",
      "AI-focused hackathon",
    ],
  },
];

export default function PreviousEditions() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/editions"); // Navigate to /editions page
  };
  return (
    <section
      id="editions"
      className="relative w-full min-h-screen py-20 lg:py-32 px-6 sm:px-8 lg:px-16"
    >
      {/* Clean background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight">
              Previous Editions
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-[#9d927d] to-transparent hidden sm:block"
            />
          </div>
          <p className="text-gray-400 text-base sm:text-lg font-light max-w-2xl mt-6 leading-relaxed">
            A journey of innovation and growth. Explore the milestones that
            shaped our hackathon community.
          </p>
        </motion.div>

        {/* Editions Timeline */}
        <div className="space-y-16 lg:space-y-20">
          {editions.map((edition, index) => (
            <motion.article
              key={edition.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Content Side */}
                <motion.div
                  className={`order-2 ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Year Badge */}
                  <div className="mb-6">
                    <span className="inline-block text-xs font-light tracking-widest text-[#9d927d] uppercase mb-2">
                      Edition {edition.id}
                    </span>
                    <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-2">
                      {edition.title}
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 60 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="h-px bg-[#9d927d]"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 font-light leading-relaxed text-base mb-8">
                    {edition.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-8 mb-12 py-8 border-y border-white/10">
                    {edition.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      >
                        <div className="text-3xl font-light text-white mb-1">
                          {stat.number}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-light">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Event Info */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-4 text-sm text-gray-300">
                      <span className="font-light text-[#9d927d] w-16">
                        When
                      </span>
                      <span className="font-light">{edition.date}</span>
                    </div>
                    <div className="flex items-start gap-4 text-sm text-gray-300">
                      <span className="font-light text-[#9d927d] w-16">
                        Where
                      </span>
                      <span className="font-light">{edition.location}</span>
                    </div>
                    <div className="flex items-start gap-4 text-sm text-gray-300">
                      <span className="font-light text-[#9d927d] w-16">
                        Theme
                      </span>
                      <span className="font-light">{edition.theme}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-light mb-4">
                      Highlights
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edition.highlights.map((highlight, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="px-3 py-1.5 border border-white/10 rounded-sm text-xs font-light text-gray-300 hover:border-[#9d927d] hover:text-[#9d927d] transition-colors duration-300"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-sm font-light text-[#9d927d] hover:text-white transition-colors duration-300 group/btn"
                  >
                    <span
                      onClick={handleClick}
                      className="underline cursor-pointer "
                    >
                      View Details
                    </span>

                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Image Side */}
                <motion.div
                  className={`order-1 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative">
                    {/* Minimal frame effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-lg" />

                    <div className="relative aspect-square bg-gradient-to-br from-[#1a1f3a] to-[#2d1b4e] rounded-lg overflow-hidden p-8 sm:p-12">
                      {/* Subtle corner accents */}
                      <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-[#9d927d] to-transparent" />
                      <div className="absolute top-0 left-0 h-px w-8 bg-gradient-to-r from-[#9d927d] to-transparent" />
                      <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-[#9d927d] to-transparent" />
                      <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-[#9d927d] to-transparent" />

                      {/* Image */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={edition.image}
                          alt={edition.title}
                          className="w-full h-full object-contain filter drop-shadow-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Year label below image */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-right"
                  >
                    <span className="text-5xl sm:text-6xl font-light text-white/20 tracking-tight">
                      {edition.year}
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Divider */}
              {index < editions.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 lg:my-20"
                />
              )}
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 lg:mt-32"
        >
          <div className="border-t border-white/10 pt-16">
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-light mb-4">
                What's Next
              </p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
                TRC 3.0 Coming Soon
              </h3>
              <p className="text-gray-400 font-light max-w-2xl mb-8 leading-relaxed">
                Building on the success of previous editions, we're preparing an
                even bigger and better hackathon experience. Mark your
                calendars.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-3 border border-[#9d927d] text-[#9d927d] hover:bg-[#9d927d]/5 transition-all duration-300 rounded-sm font-light text-sm"
              >
                <span>Notify Me</span>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
