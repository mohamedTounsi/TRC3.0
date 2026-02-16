"use client";

import { motion } from "framer-motion";
import { Zap, Trophy, Users } from "lucide-react";

const features = [
  { title: "Hackathon", icon: Zap, color: "#cfdaff" },
  { title: "Competition", icon: Trophy, color: "#cfdaff" },
  { title: "Networking", icon: Users, color: "#cfdaff" },
];

export default function Aboutus() {
  const bgImageUrl = "/whatis3.png"; // <-- Replace with your image

  return (
    <div
      id="about"
      className="relative w-full min-h-screen pt-16 pb-16 px-4 sm:px-8 lg:px-16 flex items-center justify-center overflow-hidden"
    >
      {/* Desktop Background Image (hidden on mobile) */}
      <div
        className="absolute inset-0 -z-10 hidden sm:block"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(2px)",
        }}
      />

      {/* Mobile Background Gradient (visible only on mobile) */}
      <div className="absolute inset-0 -z-10 sm:hidden bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]" />

      {/* Overlay for readability (only show on desktop when image is visible) */}
      <div className="absolute inset-0 bg-black/40 -z-10 hidden sm:block" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-7xl z-10"
      >
        {/* Main container */}
        <div className="relative border border-[#efb073]/40 rounded-3xl backdrop-blur-xl bg-white/3 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#efb073]/5 via-transparent to-[#7fb3ff]/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
                >
                  What is
                  <span className="ml-3 text-[#efb073]">TRC ?</span>
                </motion.h1>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 bg-[#efb073] rounded-full"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 leading-relaxed font-light text-lg"
              >
                This event is a National Technical Hackathon where participants
                develop and present innovative solutions to address modern
                global challenges through IT innovations. Each edition focuses
                on a different theme, such as poverty or the impact of war.
                Interactive workshops and team-building activities enrich the
                experience, fostering networking, collaboration, and creativity
                in an inspiring and friendly atmosphere.
              </motion.p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                      className="flex flex-col items-center text-center p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/15 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                    >
                      <div
                        className="p-3 rounded-lg mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: feature.color + "25" }}
                      >
                        <Icon
                          className="w-6 h-6 transition-colors duration-300"
                          style={{ color: feature.color }}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base text-white font-medium">
                        {feature.title}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right circle photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 flex justify-center items-center"
            >
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden ring-4 ring-[#efb073]/30 shadow-2xl">
                <img
                  src="/trclogocircle.png"
                  alt="IEEE ISIMS SB Logo"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
