"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

// Panelists - 3 people
const panelists = [
  {
    name: "Mrs. Amira Ouerfelli",
    title: "Electrical and Automation Engineer",
    organization: "SIGHT Tunisia Section CHAIR",
    chapter: "SIGHT Tunisia Section Group",
    chapterIcon: "/partners/sight.svg",
    points: [
      "IEEE MGA Representative, HTB (2026)",
      "IEEE HTB SIGHT Chair (2026)",
      "IEEE HTAC Region 8 Member (2026)",
      "IEEE SIGHT Tunisia Section Chair (2025–2026)",
      "Humanitarian Technologies Coordinator, IEEE Tunisia Section (2025–2026)",
      "Co-Chair, Implementation Committee for Education, IEEE Smart Village Global (2025–2026)",
      "IAS WIE Region 8 Representative (2025–2026)",
    ],
    image: "/speakers/amira.png",
  },
  {
    name: "Prof. Ahmed Hassan",
    title: "Professor of Robotics",
    organization: "Tunisia Polytechnic School",
    chapter: "IES Tunisia Section Chapter",
    chapterIcon: "/partners/ies.webp",
    points: [
      "Expert in industrial automation systems",
      "Led 5 EU-funded robotics projects",
      "Founder of Tunisia AI Hub",
      "Published 60+ research papers",
      "Supervised 15 PhD students",
      "Holder of 8 patents",
      "IEEE Robotics Award 2023",
    ],
    image: "/speakers/amenallah.png",
  },
  {
    name: "Dr. Maya Ben Ali",
    title: "Chief Technology Officer",
    organization: "InnovX Labs",
    chapter: "WIE Tunisia Section AG",
    chapterIcon: "/partners/wie.png",
    points: [
      "20+ years in embedded systems",
      "Mentor for 50+ women in STEM",
      "Author of 'Future of Edge Computing'",
      "Former CTO at 2 tech unicorns",
      "Forbes Top 50 Tech Leaders",
      "MIT Technology Review Innovator",
      "Board member at 3 tech foundations",
    ],
    image: "/speakers/eyachaaben.png",
  },
];

// Workshop Speaker - 1 person
const workshopSpeaker = {
  name: "Mr. Amir Zouenkhi",
  title: "From Model to Product Workshop",
  chapter: "IAS Tunisia Section Chapter",
  chapterIcon: "/partners/ias.webp",
  workshop: "From Model to Products: Integrating AI into Your Applications",
  workshopDate: "20:00 AM -21:30 PM",
  registrationLink: "https://forms.example.com/workshop-registration",
  points: [
    "SOFTWARE EnGINEER",
    "IT CONSULTANT & SOFTWARE ARCHITECTURE SPECIALIST - SCALIA DEV ",
    "TREASURER - IEEE IAS TUNISIA SECTION CHAPTER",
    "FORMER VICE CHAIR - IEEE IAS/LES/PES ESPRIT SBJC",
    "FORMER COMMUNITY MANAGER - LEEE PES TUNISIA SECTION CHAPTER",
  ],
  image: "/speakers/amirz.png",
};

// Speakers - 10 people
const speakers = [
  {
    name: "Elena Rodriguez",
    title: "ML Engineering Lead",
    organization: "Spotify",
    chapter: "IAS Tunisia Section Chapter",
    chapterIcon: "/partners/ias.webp",
    points: [
      "Leads personalization algorithms team",
      "Ex-Google Brain researcher",
      "PhD in Computational Neuroscience",
      "Published 15 papers in top conferences",
      "Speaker at NeurIPS 2023",
      "Mentor at Women in ML",
      "Open source contributor to TensorFlow",
    ],
    image: "/speakers/speaker1.jpg",
  },
  {
    name: "Omar Mejri",
    title: "Senior Robotics Engineer",
    organization: "Boston Dynamics",
    chapter: "IES Tunisia Section Chapter",
    chapterIcon: "/partners/ies.webp",
    points: [
      "Lead engineer on Atlas project",
      "Specializes in locomotion algorithms",
      "10+ robotics patents",
      "PhD in Robotics from Carnegie Mellon",
      "DARPA Robotics Challenge winner",
      "Published in Science Robotics",
      "Advisor to 5 robotics startups",
    ],
    image: "/speakers/speaker2.jpg",
  },
  {
    name: "Dr. Nadia Khelil",
    title: "Power Systems Expert",
    organization: "Siemens Energy",
    chapter: "PES Tunisia Section Chapter",
    chapterIcon: "/partners/pes.png",
    points: [
      "Smart grid infrastructure specialist",
      "Led North Africa renewable integration",
      "IEEE PES Distinguished Lecturer",
      "30+ years in energy sector",
      "Author of 50+ technical papers",
      "Holder of 12 patents",
      "UN Climate Change advisor",
    ],
    image: "/speakers/speaker3.jpg",
  },
  {
    name: "Youssef Trabelsi",
    title: "Aerospace Systems Engineer",
    organization: "Airbus Defence",
    chapter: "Aess Tunisia Section Chapter",
    chapterIcon: "/partners/aess.png",
    points: [
      "Avionics and navigation systems",
      "Worked on Eurofighter Typhoon",
      "PhD in Aerospace Engineering",
      "15 years in aerospace industry",
      "Led 3 major defense projects",
      "Published in IEEE Aerospace",
      "Security clearance holder",
    ],
    image: "/speakers/speaker4.jpg",
  },
  {
    name: "Dr. Leila Bouaziz",
    title: "Humanitarian Tech Director",
    organization: "Engineers Without Borders",
    chapter: "Sight Tunisia Section Group",
    chapterIcon: "/partners/sight.svg",
    points: [
      "Disaster response technology specialist",
      "Developed low-cost water sensors",
      "UN Tech Ambassador 2023",
      "Worked in 15 disaster zones",
      "Founded 3 humanitarian tech NGOs",
      "TEDx speaker on tech for good",
      "Forbes 40 Under 40 2024",
    ],
    image: "/speakers/speaker5.jpg",
  },
  {
    name: "Prof. Samir Gharbi",
    title: "Circuits Design Professor",
    organization: "ENIT Tunis",
    chapter: "CEDA Tunisia chapter",
    chapterIcon: "/partners/ceda.png",
    points: [
      "VLSI design expert",
      "Founded 2 semiconductor startups",
      "IEEE CEDA Outstanding Contributor",
      "Published 100+ research papers",
      "Supervised 30+ PhD students",
      "Holder of 15 patents",
      "Consultant for Intel and AMD",
    ],
    image: "/speakers/speaker6.jpg",
  },
  {
    name: "Dr. Amira Mansour",
    title: "Women in STEM Advocate",
    organization: "UNESCO",
    chapter: "WIE Tunisia Section AG",
    chapterIcon: "/partners/wie.png",
    points: [
      "Global gender equality in tech",
      "Launched 15 STEM programs in Africa",
      "Forbes 40 Under 40 2024",
      "Advisor to 10 governments",
      "Published book on women in tech",
      "CNN Hero of the Year 2023",
      "PhD from Oxford University",
    ],
    image: "/speakers/speaker7.jpg",
  },
  {
    name: "Mehdi Ben Abdallah",
    title: "Industrial IoT Architect",
    organization: "Schneider Electric",
    chapter: "IES Tunisia Section Chapter",
    chapterIcon: "/partners/ies.webp",
    points: [
      "Industry 4.0 implementation expert",
      "Smart factory pioneer",
      "20+ industrial automation projects",
      "Certified IoT specialist",
      "Led digital transformation for 10 factories",
      "Published in Industry 4.0 journal",
      "Speaker at Hannover Messe",
    ],
    image: "/speakers/speaker8.jpg",
  },
  {
    name: "Dr. Sonia Ferchichi",
    title: "Energy Policy Advisor",
    organization: "IRENA",
    chapter: "PES Tunisia Section Chapter",
    chapterIcon: "/partners/pes.png",
    points: [
      "Renewable energy transition strategist",
      "Advised 12 governments on energy policy",
      "Oxford Climate Scholar",
      "Author of 3 energy policy books",
      "Led 5 major renewable projects",
      "UN Sustainable Development advisor",
      "PhD in Energy Economics",
    ],
    image: "/speakers/speaker9.jpg",
  },
  {
    name: "Hichem Jelassi",
    title: "Deep Learning Researcher",
    organization: "NVIDIA",
    chapter: "CN Tunisia Section",
    chapterIcon: "/partners/cn.png",
    points: [
      "CUDA optimization specialist",
      "Contributor to PyTorch",
      "GPU architecture expert",
      "Published 20+ papers in ML conferences",
      "Speaker at GTC 2023",
      "Open source maintainer",
      "PhD in Deep Learning",
    ],
    image: "/speakers/speaker10.jpg",
  },
];

// Round Tables Registration
const roundTablesRegistration = {
  title: "Round Table Discussions",
  description:
    "Join intimate discussions with our speakers on specialized topics",
  date: "March 26, 2024 • 9:00 AM - 5:00 PM",
  location: "Tunisia Tech Center, Tunis",
  registrationLink: "https://forms.example.com/roundtables-registration",
  topics: [
    "AI Ethics & Governance",
    "Robotics in Industry 4.0",
    "Renewable Energy Systems",
    "Women in STEM Leadership",
    "Aerospace Innovation",
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function SpeakersPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Navbar />

      <main
        ref={containerRef}
        className="relative min-h-screen bg-[#0a0f1f] overflow-hidden"
      >
        {/* Elegant Background with Depth - Darker */}
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
                Distinguished Voices
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
                Our Speakers
              </h1>
              <p className="text-sm font-light text-white/40 max-w-md mt-6 leading-relaxed">
                Visionary leaders and technical experts shaping the future of
                technology.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Panelists Section */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-light text-white/80 tracking-tight">
                Panelists
              </h2>
              <div className="w-12 h-px bg-white/20 mt-3" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {panelists.map((speaker, index) => (
                <SpeakerCard key={index} speaker={speaker} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Workshop Speaker Section - Featured */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-light text-white/80 tracking-tight">
                Featured Workshop
              </h2>
              <div className="w-12 h-px bg-white/20 mt-3" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <WorkshopCard speaker={workshopSpeaker} />
            </motion.div>
          </div>
        </div>

        {/* Round Tables Registration Section */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-light text-white/80 tracking-tight">
                Round Table Discussions
              </h2>
              <div className="w-12 h-px bg-white/20 mt-3" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <RegistrationCard registration={roundTablesRegistration} />
            </motion.div>
          </div>
        </div>

        {/* Speakers Section */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-light text-white/80 tracking-tight">
                Speakers & Round Table
              </h2>
              <div className="w-12 h-px bg-white/20 mt-3" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {speakers.map((speaker, index) => (
                <SpeakerCard key={index} speaker={speaker} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative px-6 sm:px-12 lg:px-24 pb-16">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-8">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-light tracking-wider text-white/20">
                {panelists.length + 1 + speakers.length} Distinguished Speakers
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Speaker Card Component with consistent image sizing and expandable points
function SpeakerCard({ speaker }) {
  const [showAllPoints, setShowAllPoints] = useState(false);
  const initialPointsCount = 3;
  const hasMorePoints = speaker.points.length > initialPointsCount;

  const displayedPoints = showAllPoints
    ? speaker.points
    : speaker.points.slice(0, initialPointsCount);

  return (
    <motion.div variants={itemVariants} className="group relative h-full">
      <div className="relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 flex flex-col overflow-hidden">
        {/* Image Container - Consistent sizing with object-cover */}
        <div className="relative w-full h-100 overflow-hidden bg-gradient-to-br from-[#0a0f1f] to-[#1a1f2f]">
          {/* Speaker Image - object-cover ensures all images fill consistently */}
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />

          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f] via-transparent to-transparent" />

          {/* Name overlay on image */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h2 className="text-xl font-light text-white/90 leading-tight">
              {speaker.name}
            </h2>
            <p className="text-xs font-light text-white/60 mt-1">
              {speaker.title}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 pt-4 flex flex-col space-y-4">
          {/* Organization */}
          <p className="text-xs font-light text-white/40">
            {speaker.organization}
          </p>

          {/* Chapter Icon - Moved to bottom of image section */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 opacity-50">
              <img
                src={speaker.chapterIcon}
                alt={speaker.chapter}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-[10px] font-light text-white/50">
              {speaker.chapter}
            </span>
          </div>

          {/* Points with expand/collapse */}
          <div className="space-y-2 mt-2">
            <ul className="space-y-2">
              {displayedPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs font-light text-white/40"
                >
                  <span className="text-white/20 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Show more/less button */}
            {hasMorePoints && (
              <button
                onClick={() => setShowAllPoints(!showAllPoints)}
                className="flex items-center gap-1 text-[10px] font-light text-white/30 hover:text-white/50 transition-colors duration-300 mt-2 group/btn"
              >
                <span>
                  {showAllPoints
                    ? "See less"
                    : `See ${speaker.points.length - initialPointsCount} more`}
                </span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    showAllPoints ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-4 right-4 w-4 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
        <div className="absolute top-4 right-4 w-px h-4 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 w-4 h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 w-px h-4 bg-white/10 group-hover:bg-white/20 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

// Workshop Card Component with registration
function WorkshopCard({ speaker }) {
  const [showAllPoints, setShowAllPoints] = useState(false);
  const initialPointsCount = 3;
  const hasMorePoints = speaker.points.length > initialPointsCount;

  const displayedPoints = showAllPoints
    ? speaker.points
    : speaker.points.slice(0, initialPointsCount);

  return (
    <div className="relative group">
      <div className="relative p-10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-700 hover:border-white/20 flex flex-col md:flex-row gap-8 items-start">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#efb073]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Left side - Workshop info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative overflow-hidden rounded-full border border-white/10">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-base font-light text-white/70">
                {speaker.name}
              </h4>
              <p className="text-xs font-light text-white/40">
                {speaker.title}
              </p>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-tight max-w-2xl">
            {speaker.workshop}
          </h3>

          {/* Workshop Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm font-light text-white/40">
              <svg
                className="w-4 h-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{speaker.workshopDate}</span>
            </div>
          </div>

          {/* Chapter Icon */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 opacity-50">
              <img
                src={speaker.chapterIcon}
                alt={speaker.chapter}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-xs font-light text-white/50">
              {speaker.chapter}
            </span>
          </div>

          {/* Points with expand/collapse */}
          <div className="space-y-3 max-w-xl">
            <ul className="space-y-3">
              {displayedPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm font-light text-white/40"
                >
                  <span className="text-[#efb073]/50 mt-1">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Show more/less button */}
            {hasMorePoints && (
              <button
                onClick={() => setShowAllPoints(!showAllPoints)}
                className="flex items-center gap-1 text-xs font-light text-white/30 hover:text-white/50 transition-colors duration-300 mt-2 group/btn"
              >
                <span>
                  {showAllPoints
                    ? "See less"
                    : `See ${speaker.points.length - initialPointsCount} more`}
                </span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    showAllPoints ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Registration Button */}
          <div className="pt-4">
            <Link
              href={speaker.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/link"
            >
              <span className="text-sm font-light text-white/80">
                Register for Workshop
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
            </Link>
          </div>
        </div>

        {/* Right side - Featured image */}
        <div className="md:w-80 h-full relative overflow-hidden bg-white/[0.02] border border-white/10">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-light tracking-[0.2em] text-white/60 uppercase">
              Workshop Lead
            </span>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-6 h-px bg-white/20" />
      <div className="absolute top-4 right-4 w-px h-6 bg-white/20" />
      <div className="absolute bottom-4 left-4 w-6 h-px bg-white/20" />
      <div className="absolute bottom-4 left-4 w-px h-6 bg-white/20" />
    </div>
  );
}

// Registration Card Component for Round Tables
function RegistrationCard({ registration }) {
  return (
    <div className="relative group">
      <div className="relative p-10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-700 hover:border-white/20">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a6fa5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          {/* Left side - Info */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs font-light tracking-[0.2em] text-white/30 uppercase">
                Limited Seats Available
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-tight">
              {registration.title}
            </h3>

            <p className="text-sm font-light text-white/40 max-w-xl">
              {registration.description}
            </p>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-light text-white/40">
                <svg
                  className="w-4 h-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{registration.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-light text-white/40">
                <svg
                  className="w-4 h-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{registration.location}</span>
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-3">
              <h4 className="text-sm font-light text-white/60">
                Discussion Topics:
              </h4>
              <div className="flex flex-wrap gap-2">
                {registration.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-light text-white/40 bg-white/5 border border-white/10"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Registration CTA */}
          <div className="md:w-72 space-y-4">
            <div className="p-6 bg-white/[0.02] border border-white/10 text-center">
              <div className="text-3xl font-light text-white/30 mb-2">10</div>
              <div className="text-xs font-light text-white/40">
                Round Tables
              </div>
              <div className="w-8 h-px bg-white/10 mx-auto my-4" />
              <div className="text-xs font-light text-white/30">
                Interactive sessions with our speakers
              </div>
            </div>

            <Link
              href={registration.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/link text-center"
            >
              <span className="text-sm font-light text-white/80 flex items-center justify-center gap-3">
                Register for Round Tables
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
            </Link>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-6 h-px bg-white/20" />
      <div className="absolute top-4 right-4 w-px h-6 bg-white/20" />
      <div className="absolute bottom-4 left-4 w-6 h-px bg-white/20" />
      <div className="absolute bottom-4 left-4 w-px h-6 bg-white/20" />
    </div>
  );
}
