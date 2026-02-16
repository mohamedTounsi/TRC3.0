"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegistrationClosedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f1419]">
      {/* Navbar fixed on top */}
      <Navbar />

      {/* Background gradient with subtle overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#efb073]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9d927d]/5 rounded-full blur-3xl" />
      </div>

      {/* Center content */}
      <div className="flex flex-col min-h-screen items-center justify-start pt-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-[#efb073]/30 flex items-center justify-center">
                <Clock className="w-10 h-10 text-[#efb073]" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-[#efb073]/20"
              />
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4"
          >
            Registration
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#efb073] to-[#9d927d]">
              Closed
            </span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-[#efb073]/40 via-[#efb073] to-[#efb073]/40 mx-auto mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-400 font-light mb-6 leading-relaxed text-lg"
          >
            Registration for this event is currently closed. We're preparing for
            an amazing experience and will open registration soon.
          </motion.p>

          {/* Next Opening Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-[#9d927d]/20 rounded-2xl p-6 mb-10"
          >
            <p className="text-[#9d927d] font-light mb-2">
              Next Registration Opens
            </p>
            <p className="text-2xl text-white font-light">Coming Soon</p>
            <div className="flex justify-center gap-2 mt-3 text-sm text-gray-400">
              <span className="px-3 py-1 bg-white/5 rounded-full">
                Stay Tuned
              </span>
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-6"
          >
            {/* Contact Email */}
            <a
              href="mailto:isims.sb@ieee.org"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-[#efb073] transition-colors group"
            >
              <Mail
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-light">isims.sb@ieee.org</span>
            </a>

            {/* Social Links */}
            <div className="flex justify-center gap-8 pt-4">
              <a
                href="https://www.facebook.com/events/1340046997878643/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%2C%22ref_notif_type%22%3Anull%7D"
                className="flex items-center gap-2 text-gray-300 hover:text-[#9d927d] transition-colors group"
              >
                <Facebook
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-light">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/tech_resolve_challenge/"
                className="flex items-center gap-2 text-gray-300 hover:text-[#9d927d] transition-colors group"
              >
                <Instagram
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-light">Instagram</span>
              </a>
            </div>
          </motion.div>

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="h-0.5 bg-gradient-to-r from-[#9d927d]/20 via-[#9d927d] to-[#9d927d]/20 max-w-xs mx-auto mt-12"
          />
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
