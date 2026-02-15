"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const router = useRouter();

  // Smooth scroll function
  const scrollToSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to page
  const goToPage = (page) => {
    setIsOpen(false);
    router.push(page);
  };

  // Handle logo click - navigate to home
  const handleLogoClick = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e] shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-4 flex justify-between items-center">
          {/* Logo */}
          <img
            src="/trc3logo.png"
            alt="logo"
            className="h-10 md:h-14 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-sm font-light tracking-wider text-white">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#9d927d] transition"
            >
              HOME
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#9d927d] transition"
            >
              ABOUT
            </button>

            {/* Program dropdown */}
            <div className="relative">
              <button
                onClick={() => setProgramOpen(!programOpen)}
                className="flex items-center gap-2 hover:text-[#9d927d] transition"
              >
                PROGRAM <ChevronDown size={18} />
              </button>

              <AnimatePresence>
                {programOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-4 bg-[#1a1f3a] rounded-lg shadow-xl overflow-hidden border border-[#efb073] backdrop-blur-sm"
                  >
                    <button
                      onClick={() => goToPage("/schedule")}
                      className="block px-6 py-3 hover:bg-[#efb073]/10 w-full text-left text-sm font-light text-white transition-colors"
                    >
                      Schedule
                    </button>
                    <div className="h-px bg-[#efb073]/20" />
                    <button
                      onClick={() => goToPage("/speakers")}
                      className="block px-6 py-3 hover:bg-[#efb073]/10 w-full text-left text-sm font-light text-white transition-colors"
                    >
                      Speakers
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => goToPage("/sponsors")}
              className="hover:text-[#9d927d] transition"
            >
              SPONSORS
            </button>

            <button
              onClick={() => goToPage("/editions")}
              className="hover:text-[#9d927d] transition"
            >
              EDITIONS
            </button>

            <button
              onClick={() => router.push("/registration")}
              className="border border-[#efb073] bg-[#efb073] px-5 py-2 rounded-lg cursor-pointer hover:bg-[#efb073]/90 transition text-[#0f1419] font-light"
            >
              REGISTER
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-[#9d927d]/40 via-[#9d927d] to-[#9d927d]/40"
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0f1419] border-t border-[#9d927d]/30"
            >
              <div className="flex flex-col gap-6 p-6 text-white font-light tracking-wider">
                <button onClick={() => scrollToSection("home")}>HOME</button>
                <button onClick={() => scrollToSection("about")}>ABOUT</button>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setProgramOpen(!programOpen)}
                    className="flex items-center gap-2 text-left"
                  >
                    PROGRAM{" "}
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        programOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {programOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-3 pl-4 border-l border-[#efb073]/40"
                      >
                        <button
                          onClick={() => goToPage("/schedule")}
                          className="text-sm font-light hover:text-[#efb073] transition"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => goToPage("/speakers")}
                          className="text-sm font-light hover:text-[#efb073] transition"
                        >
                          Speakers
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button onClick={() => goToPage("/sponsors")}>SPONSORS</button>
                <button onClick={() => goToPage("/editions")}>EDITIONS</button>

                <button
                  onClick={() => router.push("/registration")}
                  className="border border-[#efb073] bg-[#efb073] px-5 py-2 rounded-lg cursor-pointer hover:bg-[#efb073]/90 transition text-[#0f1419] font-light"
                >
                  REGISTER
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Navbar spacer */}
      <div className="h-20"></div>
    </>
  );
}
