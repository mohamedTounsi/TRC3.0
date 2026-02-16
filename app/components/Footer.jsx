"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/", section: "home" },
    { name: "About", href: "/", section: "about" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Editions", href: "/editions" },
  ];

  const programLinks = [
    { name: "Schedule", href: "/schedule" },
    { name: "Speakers", href: "/speakers" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/tech_resolve_challenge/",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/events/1340046997878643/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%2C%22ref_notif_type%22%3Anull%7D",
      label: "Facebook",
    },
  ];

  const contactInfo = [
    { icon: Mail, text: "isims.sb@ieee.org", href: "mailto:isims.sb@ieee.org" },
    { icon: Phone, text: "+216 53 744 705", href: "tel:+216 53 744 705" },
    { icon: MapPin, text: "Sfax, Tunisia", href: "#" },
  ];

  const scrollToSection = (id) => {
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavigation = (item) => {
    if (item.section) {
      if (window.location.pathname === "/") {
        scrollToSection(item.section);
      } else {
        router.push("/");
        // Small delay to ensure navigation completes before scrolling
        setTimeout(() => scrollToSection(item.section), 100);
      }
    } else {
      router.push(item.href);
    }
  };

  return (
    <footer className="relative w-full bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e] border-t border-[#9d927d]/30 overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#efb073]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9d927d]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <img
              src="/trc3logo.png"
              alt="TRC Logo"
              className="h-12 md:h-16 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => router.push("/")}
            />
            <p className="text-sm text-[#9d927d] font-light leading-relaxed">
              Empowering innovation and fostering excellence through technology
              and collaboration.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(239, 176, 115, 0.1)",
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#efb073]/60 text-[#efb073] hover:border-[#efb073] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-light text-white tracking-wider">
              Quick Links
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#efb073] to-[#9d927d] rounded-full" />
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="text-sm text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-light text-white tracking-wider">
              Program
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#efb073] to-[#9d927d] rounded-full" />
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-light text-white tracking-wider">
              Contact
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#efb073] to-[#9d927d] rounded-full" />
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300 group"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#9d927d]/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#9d927d] font-light">
              © {currentYear} TRC. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs text-[#9d927d] hover:text-[#efb073] font-light transition-colors duration-300"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="h-1 bg-gradient-to-r from-[#9d927d]/40 via-[#9d927d] to-[#9d927d]/40"
      />
    </footer>
  );
}
