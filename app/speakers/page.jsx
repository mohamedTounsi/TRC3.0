"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Navbar always on top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]" />

      {/* Center content */}
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl"
        >
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-white mb-4">
            Coming Soon
          </h1>

          <div className="w-20 h-px bg-[#9d927d] mx-auto mb-8" />

          <p className="text-gray-400 font-light mb-12 leading-relaxed">
            We're preparing something exciting. Stay tuned and follow us for
            updates.
          </p>

          <div className="flex justify-center gap-8">
            <a
              href="https://www.facebook.com/events/1340046997878643/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
              className="flex items-center gap-2 text-gray-300 hover:text-[#9d927d] transition-colors"
            >
              <Facebook size={18} />
              Facebook
            </a>

            <a
              href="https://www.instagram.com/tech_resolve_challenge/"
              className="flex items-center gap-2 text-gray-300 hover:text-[#9d927d] transition-colors"
            >
              <Instagram size={18} />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
