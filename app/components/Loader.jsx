"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SmoothLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 2 + 1;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
        }

        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0f1419 0%, #1a1f3a 50%, #2d1b4e 100%)",
          }}
        >
          {/* Logo */}
          <motion.img
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src="/trc3logo.png"
            alt="TRC"
            className="h-16 md:h-20 object-contain mb-12"
          />

          {/* Loading Line */}
          <div className="w-48 md:w-56 relative">
            {/* Background line */}
            <div className="h-[2px] bg-white/10 w-full" />

            {/* Animated progress line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#9d927d] to-[#efb073]"
            />
          </div>

          {/* Percentage - always visible with gray text */}
          <div className="mt-4 text-xs text-gray-400 font-mono">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
