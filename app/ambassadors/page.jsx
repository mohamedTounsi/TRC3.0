"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ambassadors = [
  {
    firstName: "Safouen",
    lastName: "Mardessi",
    image: "/affiche/saf.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Hadil",
    lastName: "Kharroubi",
    image: "/affiche/hadil.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Cagdas Ozan",
    lastName: "Pamuk",
    image: "/affiche/trk1.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Mahdi",
    lastName: "Madani",
    image: "/affiche/mahdi.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Hsan",
    lastName: "Balazi",
    image: "/affiche/hsan.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Ameni",
    lastName: "Rahmi",
    image: "/affiche/amenii.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Ali",
    lastName: "Ben Tiba",
    image: "/affiche/aliu.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Elaa",
    lastName: "Ben Yahia",
    image: "/affiche/ela.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Yosser",
    lastName: "Dhouib",
    image: "/affiche/yoser.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Sirine",
    lastName: "Rebai",
    image: "/affiche/sir.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Salim",
    lastName: "Jridi",
    image: "/affiche/selim.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Helmi",
    lastName: "Mejri",
    image: "/affiche/helmi.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Med Aziz",
    lastName: "Moalla",
    image: "/affiche/zayz.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Youssef",
    lastName: "Frikha",
    image: "/affiche/frikha.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Amani",
    lastName: "Awainia",
    image: "/affiche/amani.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Younes",
    lastName: "Abid",
    image: "/affiche/younes.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Ghada",
    lastName: "Hamza",
    image: "/affiche/ghada.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Ibrahim Khalil",
    lastName: "Mouhli",
    image: "/affiche/18.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Amine",
    lastName: "Trabelsi",
    image: "/affiche/19.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Ranym Abich",
    lastName: "Ben Khaled",
    image: "/affiche/20.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Sarra",
    lastName: "Mannai",
    image: "/affiche/21.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Rayen",
    lastName: "Khammar",
    image: "/affiche/22.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Issraa",
    lastName: "Troudi",
    image: "/affiche/23.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Mariam",
    lastName: "Taktak",
    image: "/affiche/24.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Rane",
    lastName: "Bejaoui",
    image: "/affiche/25.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
];

export default function Ambassadors() {
  return (
    <div>
      <Navbar />
      <div className="relative w-full border-t border-[#9d927d]/30 min-h-screen overflow-hidden pt-20 pb-20 px-4 sm:px-8 lg:px-16 flex flex-col bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]">
        {/* Header */}
        <div className="mb-12 text-start space-y-4">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-light text-white">
            Meet our
            <span className="ml-2.5 text-transparent bg-clip-text bg-gradient-to-r from-[#efb073] via-[#9d927d] to-[#efb073]">
              Ambassadors
            </span>
          </h1>
          <div className="h-px bg-gradient-to-r from-[#efb073]/40 via-[#efb073] to-[#efb073]/40 rounded-full max-w-xs" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ambassadors.map((ambassador, index) => (
            <AmbassadorCard
              key={index}
              ambassador={ambassador}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AmbassadorCard({ ambassador, delay }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer"
      style={{ border: "1px solid rgba(157, 146, 125, 0.45)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={ambassador.image}
        alt={`${ambassador.firstName} ${ambassador.lastName}`}
        fill
        className="object-cover"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4"
      >
        <h3 className="text-lg font-light text-white leading-tight mb-2">
          {ambassador.firstName}
          <span className="ml-1.5 font-extralight text-[#efb073]">
            {ambassador.lastName}
          </span>
        </h3>

        <div className="flex items-center gap-2">
          <SocialIcon href={ambassador.social.instagram} hovered={hovered}>
            <Instagram className="w-4 h-4" />
          </SocialIcon>
          <SocialIcon href={ambassador.social.facebook} hovered={hovered}>
            <Facebook className="w-4 h-4" />
          </SocialIcon>
          <SocialIcon href={ambassador.social.linkedin} hovered={hovered}>
            <Linkedin className="w-4 h-4" />
          </SocialIcon>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SocialIcon({ href, children, hovered }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
      transition={{ duration: 0.25 }}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-[#efb073]/60 text-[#efb073] hover:bg-[#efb073]/20 hover:border-[#efb073] transition-colors duration-200"
    >
      {children}
    </motion.a>
  );
}
