"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const teamMembers = [
  {
    firstName: "Emna",
    lastName: "Megdiche",
    position: "Event Leader",
    image: "/team/megdich.png",
    social: {
      instagram: "https://www.instagram.com/emna_megdiche3/",
      facebook: "https://www.facebook.com/mannou.megdiche",
      linkedin: "https://www.linkedin.com/in/emna-megdiche-1997b225a/",
    },
  },
  {
    firstName: "Aziz",
    lastName: "Alimi",
    position: "Program Manager",
    image: "/team/alimi2.png",
    social: {
      instagram: "https://www.instagram.com/azizalimi_/",
      facebook: "https://www.facebook.com/aziz.alimi.3",
      linkedin: "https://www.linkedin.com/in/aziz-alimi-3717a333a/",
    },
  },
  {
    firstName: "Yosra",
    lastName: "Teieb",
    position: "HR Leader",
    image: "/team/yosra.png",
    social: {
      instagram: "https://www.instagram.com/yosra._.teieb/",
      facebook: "https://www.facebook.com/yosra.teieb.2025",
      linkedin: "https://www.linkedin.com/in/yosra-teieb/",
    },
  },
  {
    firstName: "Fedi",
    lastName: "Triki",
    position: "Marketing Manager",
    image: "/team/fedi.png",
    social: {
      instagram: "https://www.instagram.com/trikifedi7/",
      facebook: "https://www.facebook.com/fedi.triki.121",
      linkedin: "https://www.linkedin.com/in/fedi-triki/",
    },
  },
  {
    firstName: "AbdelKader",
    lastName: "Barkia",
    position: "Finance Leader",
    image: "/team/gaddour.png",
    social: {
      instagram: "https://www.instagram.com/abdelkader_barkia/",
      facebook: "https://www.facebook.com/abdelkader.barkia.2025",
      linkedin: "https://www.linkedin.com/in/abdelkader-barkia-0312b3357/",
    },
  },
  {
    firstName: "Aziz",
    lastName: "Louati",
    position: "Sponsoring Leader",
    image: "/team/azich.png",
    social: {
      instagram: "https://www.instagram.com/aziz_louatiii/",
      facebook: "https://www.facebook.com/aziz.louati.890707",
      linkedin: "#",
    },
  },
  {
    firstName: "Elee",
    lastName: "Abidi",
    position: "Ambassador Coordinator",
    image: "/team/elee.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Rim",
    lastName: "Rekik",
    position: "Logistics Leader",
    image: "/team/rim.png",
    social: {
      instagram: "https://www.instagram.com/rimrekik16/",
      facebook: "https://www.facebook.com/rim.rekik.794",
      linkedin: "https://www.linkedin.com/in/rim-rekik-03295a381/",
    },
  },
  {
    firstName: "Mohamed",
    lastName: "Rebai",
    position: "Logistics Leader",
    image: "/team/rebai.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Mahmoud",
    lastName: "Dammak",
    position: "Media Leader",
    image: "/team/dammak.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
  {
    firstName: "Mohamed",
    lastName: "Tounsi",
    position: "Website Manager",
    image: "/team/rouge.png",
    social: { instagram: "#", facebook: "#", linkedin: "#" },
  },
];

export default function Team() {
  return (
    <div className="relative w-full border-t border-[#9d927d]/30 min-h-screen overflow-hidden pt-5 md:pt-20 pb-20 px-2 sm:px-8 lg:px-16 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#2d1b4e]">
      {/* Background texture */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#efb073]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9d927d]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        {/* Header */}
        <div className="mb-10 md:mb-16 text-start space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl mt-3 sm:text-6xl lg:text-7xl font-light text-white"
          >
            Meet our
            <span className="ml-2.5 text-transparent bg-clip-text bg-gradient-to-r from-[#efb073] via-[#9d927d] to-[#efb073]">
              Team
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-[#efb073]/40 via-[#efb073] to-[#efb073]/40 rounded-full max-w-xs"
          />
        </div>

        {/* Team Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-wrap gap-3 sm:gap-6 justify-center lg:justify-start"
        >
          {teamMembers.map((member, index) => {
            const isLastRow = index >= teamMembers.length - 3;

            return (
              <TeamCard
                key={index}
                member={member}
                delay={0.4 + index * 0.1}
                isLastRow={isLastRow}
                style={{ margin: isLastRow ? "4px" : undefined }} // smaller gap for last row
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

function TeamCard({ member, delay, isLastRow }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`w-[calc(50%-12px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]
      ${isLastRow ? "lg:mx-auto" : ""}`}
    >
      <div className="relative border border-[#9d927d] rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#1a1f3a]/90 to-[#2d1b4e]/90 py-6 px-1.5 sm:p-6 h-full">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-72 lg:h-80   overflow-hidden rounded-2xl">
          <Image
            src={member.image}
            alt={`${member.firstName} ${member.lastName}`}
            fill
            className="object-cover"
            priority
          />

          {/* Always visible social icons */}
          <div className="absolute top-14 md:top-20 right-2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3">
            {member.social.instagram && (
              <SocialIcon href={member.social.instagram}>
                <Instagram />
              </SocialIcon>
            )}
            {member.social.facebook && (
              <SocialIcon href={member.social.facebook}>
                <Facebook />
              </SocialIcon>
            )}
            {member.social.linkedin && (
              <SocialIcon href={member.social.linkedin}>
                <Linkedin />
              </SocialIcon>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="mt-4 text-center space-y-1">
          <h3 className="text-lg sm:text-2xl font-light text-white">
            {member.firstName}
            <br className="block sm:hidden" />
            <span className=" ml-2 font-extralight text-[#efb073]">
              {member.lastName}
            </span>
          </h3>

          <p className="text-xs sm:text-sm font-light text-[#9d927d] tracking-widest uppercase">
            {member.position}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SocialIcon({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#efb073]/60 text-[#efb073] hover:bg-[#efb073]/10 transition"
    >
      {React.cloneElement(children, {
        className: "w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[1.5]",
      })}
    </motion.a>
  );
}
